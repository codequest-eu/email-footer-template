import { keyBy } from "lodash";

import {
  Relationship,
  ResolvedResponse,
  Resource,
  ResourceIdentifier,
  Response
} from "./types";

export function resolveRelations(objects: Resource[]) {
  function referenceString({ type, id }: ResourceIdentifier) {
    return `${type}:${id}`;
  }

  const objectsByReference = keyBy(objects, referenceString);

  function findReferencedObject(reference: ResourceIdentifier) {
    return objectsByReference[referenceString(reference)];
  }

  objects.forEach((object) => {
    if (!object.relationships) return;

    Object.keys(object.relationships).forEach((key) => {
      if (!object.relationships) return;

      const relationship: Relationship = object.relationships[key];

      if (Array.isArray(relationship.data)) {
        relationship.data = relationship.data.map(
          (reference) => findReferencedObject(reference) || reference
        );
      } else if (relationship.data) {
        relationship.data =
          findReferencedObject(relationship.data) || relationship.data;
      }
    });
  });
}

export function resolveResponse(response: Response): ResolvedResponse {
  const { data, meta, included = [] } = response;

  const dataArray = Array.isArray(data) ? data : data ? [data] : [];
  resolveRelations([...dataArray, ...included]);

  return { data, meta };
}
