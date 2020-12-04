/* eslint-disable import/first */
/* eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access */
require("dotenv").config();

import path from "path";

import cors from "cors";
import express, { RequestHandler } from "express";
import * as pathToRegexp from "path-to-regexp";

import { mockModules } from "./api";
import { MockResponsesConfig } from "./types";
import { isValidPort } from "./utils/miscellaneous";
import { forEachResponse, getMockResponsesConfig } from "./utils/mockResponses";

const fakeBackendPort = Number(process.env.FAKE_BACKEND_PORT);

if (!isValidPort(fakeBackendPort)) {
  throw new Error("FAKE_BACKEND_PORT is invalid or not available in .env");
}

const fakeBackend = express();

export function mockResponsesMiddleware(
  mockResponsesConfig: string | MockResponsesConfig
): RequestHandler {
  return async (req, res, next) => {
    try {
      const { config, source } = await getMockResponsesConfig(
        mockResponsesConfig
      );

      forEachResponse(config, ({ method, path, headers, status, data }) => {
        if (
          req.method === method.toUpperCase() &&
          pathToRegexp.match(path)(req.path)
        ) {
          // eslint-disable-next-line no-console
          console.log(req.method, status, req.path, "from", source);

          Object.keys(headers).forEach((key) => {
            res.setHeader(key, headers[key]);
          });

          return res.status(Number(status)).send(data).end();
        }
      });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }

    if (!res.finished) {
      return next();
    }
  };
}

export function startFakeBackendServer() {
  if (!require.main) {
    throw new Error("Main file properties not available");
  }

  fakeBackend.use(express.json());
  fakeBackend.use(cors());
  fakeBackend.use(
    mockResponsesMiddleware(
      path.join(
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        path.dirname(require.main.filename),
        "./mock-responses.json"
      )
    )
  );

  for (const eachModule of mockModules) {
    fakeBackend.use(mockResponsesMiddleware(eachModule));
  }

  fakeBackend.listen(fakeBackendPort, () =>
    // eslint-disable-next-line no-console
    console.log(`Fake backend started at port: ${fakeBackendPort}`)
  );
}
