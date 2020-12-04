import * as yup from "yup";

import {
  arrayOfSchemas,
  DiscriminatedHash,
  DiscriminatedSchemasHash,
  oneOfSchemas
} from "footer-templates-app/utils/yup/schema";

export interface Reference<Type extends string> {
  type: Type;
  id: string;
}

export function reference<Type extends string>(...types: Type[]) {
  const schema = yup
    .object({
      type: yup.string().oneOf(types).required(),
      id: yup.string().defined()
    })
    .defined();

  // HACK: not sure why yup can't infer this type
  return schema as yup.ObjectSchema<Reference<Type>>;
}

export function included<T extends DiscriminatedHash<"type">>(
  schemas: DiscriminatedSchemasHash<"type", T>
) {
  return arrayOfSchemas("type", schemas);
}

export function oneOfResource<T extends DiscriminatedHash<"type">>(
  schemas: DiscriminatedSchemasHash<"type", T>
) {
  return oneOfSchemas("type", schemas);
}

export interface PaginationLinks {
  next?: string | null;
  prev?: string | null;
  first: string;
  last: string;
}

export function paginationLinks() {
  return yup.object<PaginationLinks>({
    next: yup.string().nullable(),
    prev: yup.string().nullable(),
    first: yup.string().required(),
    last: yup.string().required()
  });
}

export interface PaginationMeta {
  totalCount: number;
  totalPages: number;
}

export function paginationMeta() {
  return yup.object<PaginationMeta>({
    totalCount: yup.number().required(),
    totalPages: yup.number().required()
  });
}

export interface RelationshipLinks {
  self?: string;
  related?: string;
}

export function relationshipLinks() {
  return yup.object<RelationshipLinks>({
    self: yup.string(),
    related: yup.string()
  });
}

export function singleRelationship<T extends Reference<string> | null>(
  reference: yup.ObjectSchema<T>
) {
  const schema = yup.object({
    data: reference,
    links: relationshipLinks()
  });

  // HACK: not sure why yup can't infer this type
  return schema as yup.ObjectSchema<
    | {
        data: T;
        links?: RelationshipLinks;
      }
    | undefined
  >;
}

export function manyRelationship<T extends Reference<string>>(
  reference: yup.ObjectSchema<T>
) {
  const schema = yup.object({
    data: yup.array(reference).defined(),
    links: relationshipLinks()
  });

  // HACK: not sure why yup can't infer this type
  return schema as yup.ObjectSchema<
    | {
        data: T[];
        links?: RelationshipLinks;
      }
    | undefined
  >;
}
