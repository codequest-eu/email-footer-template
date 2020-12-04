import { MockResponse } from "../types";

export function isValidPort(port: number) {
  return Number.isSafeInteger(port) && port >= 0 && port <= 65535;
}

export function createMockResponsesConfig<
  Schema extends Record<string, MockResponse[]>
>(config: Schema): Schema {
  return config;
}
