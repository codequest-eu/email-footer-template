# fakeBackend

It's a utility that provides two major functionalities:

- `npm run fake-backend` script which starts a server with mocked endpoints that you can use during the development (when real backend is not ready yet)
- http requests mock that can be used as module in your tests (imported from `fakeBackendMock`) 

Both server and mock make use of the same mock modules specified in the `./api/index.ts` file. Please checkout some of the example modules in `./api/` directory for the reference.

## `npm run fake-backend`

It's a simple express server that runs at localhost and port specified in `.env` file. Besides mock modules, you can also specify temporary mock responses in ` ./mock-responses.json` file to test various cases (checkout `mock-responses.json.template` as a reference). 

`mock-responses.json` is ignored by GIT.


### Why this approach?

Putting mocks in the application's code just does not seem right. In drastic cases it possible to forget about them and deploy such code into production.

## `fakeBackendMock`

It's a simple wrapper for [MirageJS](https://miragejs.com/docs/main-concepts/route-handlers/) - an utility that intercepts http requests in frontend app and allows us to provide mock responses to tests, without touching any of the application's code.

## Mock Modules

The entry point of the mock modules is `footer-templates-app/fakeBackend/api/index.ts` there is a list of all mock modules exported as `mockModules` array. Each entry in `mockModules` should be created using `createMockResponsesConfig` which enforces correct shape of the config which is:

```ts
{
  "/request-path": [
    {
      // http method (required)
      method: "get";
      
      // http status (optional, default 200)
      status: 200;

      // response data (optional, any)
      data: {};

      // http headers, (optional)
      headers?: {
        "header": "value"
      };
    },

    // more methods...
  ]
}
```

There is also utility, that enforces valid json api response: `mockJsonapiResponse` and resource shape: `mockJsonapiResource` . 

Checkout already existing mocks in `footer-templates-app/fakeBackend/api` for the reference.

## Mock Requests in Tests

1. In your `.test.ts(x)` file you need to import some modules from `footer-templates-app/fakeBackend/fakeBackendMock`:

```tsx
import {
  createFakeBackendMock,
  MirageServer,
  mockResponse
} from "footer-templates-app/fakeBackend/fakeBackendMock";
```

2. Then setup new instance of `fakeBackendMock` before each test. In the top level `describe`, add following:

```tsx
let fakeBackendMock: MirageServer;

beforeEach(async () => {
  fakeBackendMock = await createFakeBackendMock(fakeBackendMock);
});
```

`createFakeBackendMock` utility creates and returns new instance of `MirageServer`. So you're not going to have problems with conflicting previously created mocks. Also, it's going to shut down previously created instance (that's why it takes fakeBackendMock as parameter).

3. Now, during the test, your app should use mock modules defined in `footer-templates-app/fakeBackend/api/index.ts` instead of real API endpoints.

4. If you'd like to add some custom cases in your test for specific requests you can define it per test:

```tsx
mockResponse(fakeBackendMock)("/request-path", {
  method: "get",
  status: 200,
  data: {
    data: []
  }
});
```

Now when your app request `GET` on `/request-path`, it should receive response with status `200` and following json:

```json
{
  "data": []
}
```

However you should always define default mock for each API endpoint in `footer-templates-app/fakeBackend/api/index.ts`. You should override only some of them for the particular test case. This way you're able to check your mocks when doing manual test with fake backend and avoid duplicated mocks.

### Why this approach?

Mocking Axios is problematic and may result with false positives/negatives in your tests. We should have test environment isolated as much as possible from the actual implementation.

## Similar solutions

- https://kentcdodds.com/blog/stop-mocking-fetch
- https://dev.to/leighhalliday/don-t-mock-fetch-or-axios-use-mock-service-worker-and-test-like-a-user-2dn6

Using service worker is a little bit "hacky" though.