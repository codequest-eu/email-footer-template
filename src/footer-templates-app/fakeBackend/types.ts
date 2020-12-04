export type HttpMethod =
  | "get"
  | "post"
  | "put"
  | "patch"
  | "delete"
  | "options";

export interface MockResponse {
  method: HttpMethod;
  status?: number;
  data?: unknown;
  headers?: Record<string, string>;
}

export type MockResponsesConfig<Schema = unknown> = {
  [Path in keyof Schema]: MockResponse[];
};

export type ValidMockResponsesConfig = NonNullable<{
  [Path: string]: Required<MockResponse>[];
}>;

export type UnionToIntersection<T> = (
  T extends unknown ? (union: T) => unknown : never
) extends (union: infer R) => unknown
  ? R
  : never;

export interface HandledRequest {
  _eventListeners: unknown;
  readyState: number;
  requestHeaders: Record<string, string>;
  requestBody: null;
  status: number;
  statusText: string;
  upload: unknown;
  method: string;
  url: string;
  async: boolean;
  responseText: string;
  response: string;
  responseXML: null;
  responseURL: string;
  sendFlag: boolean;
  timeout: number;
  sendArguments: unknown[];
  errorFlag: boolean;
  params: Record<string, string>;
  queryParams: Record<string, string>;
  responseHeaders: Record<string, string>;
}
