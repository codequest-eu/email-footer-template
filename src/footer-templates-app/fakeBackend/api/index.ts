import { UnionToIntersection } from "../types";

import { auth } from "./auth";
import { todos } from "./todos";

export const mockModules = [auth, todos];

export type FakeBackendEndpointPath = keyof UnionToIntersection<
  typeof mockModules[number]
>;
