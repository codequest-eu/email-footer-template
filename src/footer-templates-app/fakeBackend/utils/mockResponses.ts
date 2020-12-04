import fs from "fs-extra";
import { mapValues } from "lodash";
import * as yup from "yup";

import { methods } from "../consts";
import {
  MockResponse,
  MockResponsesConfig,
  ValidMockResponsesConfig
} from "../types";

const mockResponsesSchema = yup.lazy((maybeMockResponsesConfig: unknown) => {
  if (typeof maybeMockResponsesConfig !== "object") {
    throw new Error(
      `Mock responses config should be object, got "${typeof maybeMockResponsesConfig}" instead`
    );
  }

  return yup
    .object(
      mapValues(maybeMockResponsesConfig, () =>
        yup
          .array(
            yup
              .object({
                method: yup.string().oneOf(methods).required(),
                status: yup.number().default(200),
                data: yup.mixed().default({}),
                headers: yup.mixed().default({})
              })
              .required()
          )
          .required()
      )
    )
    .required();
});

async function readMockResponsesJson(jsonMockResponsesPathname: string) {
  const isJsonRequestHandlersFileAvailable = fs.existsSync(
    jsonMockResponsesPathname
  );

  if (!isJsonRequestHandlersFileAvailable || process.env.NODE_ENV === "test") {
    return {};
  }

  const jsonMockResponsesFile = await fs.readFile(
    jsonMockResponsesPathname,
    "utf8"
  );

  try {
    return (await mockResponsesSchema.validate(
      JSON.parse(jsonMockResponsesFile)
    )) as NonNullable<{ [Path: string]: Required<MockResponse>[] }>;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    throw new Error(`\n\nCannot parse "${jsonMockResponsesPathname}"`);
  }
}

export async function validateMockResponsesConfig(config: unknown) {
  return (await mockResponsesSchema.validate(
    config
  )) as ValidMockResponsesConfig;
}

export async function getMockResponsesConfig(
  mockResponsesConfig: string | MockResponsesConfig
) {
  if (typeof mockResponsesConfig === "string") {
    const configFromFile = await readMockResponsesJson(mockResponsesConfig);
    return {
      config: await validateMockResponsesConfig(configFromFile),
      source: mockResponsesConfig
    };
  }

  return {
    config: await validateMockResponsesConfig(mockResponsesConfig),
    source: "module"
  };
}

export function forEachResponse(
  config: ValidMockResponsesConfig,
  cb: (
    response: MockResponse & { path: string; headers: Record<string, string> }
  ) => void
) {
  const paths = Object.keys(config);

  for (const eachPath of paths) {
    const responses = config[eachPath];
    for (const eachResponse of responses) {
      cb({ path: eachPath, ...eachResponse });
    }
  }
}
