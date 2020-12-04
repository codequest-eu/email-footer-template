import zipObject from "lodash/zipObject";
import { Action } from "redux";

import { Resource } from "footer-templates-app/utils/jsonapi/types";

export interface PayloadAction<T extends string, P extends UnknownRecord>
  extends Action<T> {
  payload: P;
}

export function mapByIds<R extends Resource>(resources: R[]) {
  return zipObject(
    resources.map(({ id }) => id),
    resources
  );
}

export function pickType<R extends Resource>(type: R["type"]) {
  return (resource: Resource): resource is R => resource.type === type;
}
