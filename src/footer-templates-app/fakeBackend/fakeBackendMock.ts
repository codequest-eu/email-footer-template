import { Response, Server } from "miragejs";

import { FakeBackendEndpointPath, mockModules } from "./api";
import { HandledRequest, MockResponse } from "./types";
import {
  forEachResponse,
  validateMockResponsesConfig
} from "./utils/mockResponses";

/**
 * It's a tiny wrapper to keep mocked responses consistent and compatible with MirageJS
 */
export function createMirageResponse({
  status,
  headers,
  data
}: Omit<MockResponse, "method">) {
  return new Response(Number(status), headers, data as Record<string, unknown>);
}

/**
 * It's a factory function that creates a simple handler for the route defined
 * in the MirageJS server instance
 */
export function createMirageResponseHandler({
  status,
  headers,
  data
}: Omit<MockResponse, "method">) {
  return () =>
    new Response(Number(status), headers, data as Record<string, unknown>);
}

/**
 *
 * It initializes [Mirage Server](https://miragejs.com/docs/getting-started/introduction) instance with
 * pre-configured routes defined in the `footer-templates-app/fakeBackend/api/index.ts`. It also takes previous
 * instance of the Mirage Server to shut it down, before it creates a new one. When you need to mock
 * some response you should add mock module to the `footer-templates-app/fakeBackend/api`. To simulate specific
 * cases you should use `mockResponse` function.
 *
 * Example usage:
 *
 * Define a mirage server instance in the top level `describe` of your test:
 *
 * ```
 * describe("SomeComponent", () => {
 *   let fakeBackendMock: MirageServer;
 *   // ...
 * ```
 *
 * Then, initialize fake backend mock in the top level `beforeEach`:
 *
 * ```
 * beforeEach(() => {
 *   fakeBackendMock = createFakeBackendMock(fakeBackendMock);
 * ```
 *
 * During tests, application should be able to reach all API routes defined in `footer-templates-app/fakeBackend/api`.
 *
 * @param prevMirageServer prev instance of the mirage server.
 * @return [Mirage Server](https://miragejs.com/docs/getting-started/introduction) instance
 */
export async function createFakeBackendMock(
  prevMirageServer: Server | undefined
) {
  if (prevMirageServer) {
    prevMirageServer.shutdown();
  }

  const mirageServer = new Server({
    trackRequests: true,
    routes() {
      if (!process.env.REACT_APP_API_URL) {
        throw new Error("REACT_APP_API_URL env not available");
      }

      this.urlPrefix = process.env.REACT_APP_API_URL;
    }
  });

  // By default, MirageJS delays mocked requests.
  // That makes tests ridiculously slow.
  // Setting timing to 0 removes latency.
  mirageServer.timing = 0;

  for (const eachModule of mockModules) {
    const config = await validateMockResponsesConfig(eachModule);

    forEachResponse(config, ({ method, path, data, status, headers }) => {
      mirageServer[method](
        path,
        createMirageResponseHandler({ data, status, headers })
      );
    });
  }

  mirageServer.logging = false;

  return mirageServer;
}

/**
 * It replaces a specific response defined in the `footer-templates-app/fakeBackend/api/index.ts`. The type definition
 * is setup in the way that it won't allow you for using path not present in `footer-templates-app/fakeBackend/api`.
 * This way you're more likely to keep consistency across your manual and automatic tests.
 *
 * Example usage:
 *
 * ```
 * mockResponse(fakeBackendMock)("/todos", {
 *   method: "get",
 *   status: 400,
 *   data: {
 *     data: []
 *   }
 * });
 * ```
 *
 * Assuming you have `/todos` path defined somewhere in `footer-templates-app/fakeBackend/api`
 *
 * @param mirageServer [Mirage Server](https://miragejs.com/docs/getting-started/introduction) instance
 * @returns a function that takes a path and a response config for the mock
 */
export function mockResponse(mirageServer: Server) {
  /**
   * @param path path of the mocked API endpoint (it should be defined in `footer-templates-app/fakeBackend/api`)
   * @param responseConfig it defines `method*`, `status`, `headers` and `data` of the mocked response
   */
  return (
    path: FakeBackendEndpointPath,
    { method, status = 200, headers, data }: MockResponse
  ) => {
    mirageServer[method](
      path,
      createMirageResponseHandler({ data, status, headers })
    );
  };
}

/**
 * It allows for checking what requests have been sent to the API during the test.
 *
 * Example usage:
 *
 * ```
 * expect(requestHistory(fakeBackendMock)("get", fakePath)[0]).toMatchObject(
 *   {
 *     requestHeaders: {
 *       Authorization: `Bearer ${accessToken}`,
 *     }
 *   }
 * );
 * ```
 *
 * @param mirageServer [Mirage Server](https://miragejs.com/docs/getting-started/introduction) instance
 * @returns a function that takes request method and path pattern (string | RegExp), then it returns a list
 * of matching requests
 */
export function requestHistory(mirageServer: Server) {
  return (method: MockResponse["method"], pathPattern: string | RegExp) => {
    // Type definitions provided by the mirage js are not complete yet.
    // It doesn't define correct type for the pretender instance in mirage server.
    // That's why `any` assertion is present below.

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const handledRequests: HandledRequest[] =
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
      (mirageServer.pretender as any).handledRequests || [];

    const requestsFilteredByMethod = handledRequests.filter(
      (request) => request.method.toLowerCase() === method.toLowerCase()
    );

    if (requestsFilteredByMethod.length === 0) {
      return [];
    }

    const requestsFilteredByPath = requestsFilteredByMethod.filter(
      (request) => {
        const matched =
          typeof pathPattern === "string"
            ? request.url.includes(pathPattern)
            : pathPattern.test(request.url);

        return matched;
      }
    );

    return requestsFilteredByPath;
  };
}

export type MirageServer = Server;
