import defaultAxiosInstance from "axios";
import mapValues from "lodash/mapValues";
import * as yup from "yup";

import { pickNonNullable } from "footer-templates-app/utils/miscellaneous";

import { buildQuery } from "./query";
import { resolveResponse } from "./resolvers";
import {
  DeleteConfig,
  GetConfig,
  PatchConfig,
  PostConfig,
  ResolvedResponse,
  Response
} from "./types";

/** Build a path to a resource, omit `id` for singleton resources */
function buildPath(path: string, id?: string) {
  return id ? [path, id].join("/") : path;
}

/**
 * Validate a json:api response using the specified schema and cast it.
 *
 * @param schema response schema
 * @param response raw json:api response to validate
 * @returns validated response with unknown fields omitted
 */
async function validateResponse<R extends ResolvedResponse>(
  schema: yup.ObjectSchema<R>,
  response: Response
): Promise<R> {
  try {
    return await schema.validate(resolveResponse(response), {
      stripUnknown: true
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn(err);
    throw err;
  }
}

/** Create a single resource */
export async function createResource<R extends ResolvedResponse>({
  path,
  type,
  attributes,
  relationships,
  responseSchema,
  axios = defaultAxiosInstance,
  axiosConfig
}: PostConfig<R>) {
  const response = await axios.post<Response>(
    path,
    {
      data: pickNonNullable({
        type,
        attributes,
        relationships:
          relationships &&
          mapValues(relationships, (value) => ({ data: value }))
      })
    },
    axiosConfig
  );

  return validateResponse(responseSchema, response.data);
}

/** Update an existing resource */
export async function updateResource<R extends ResolvedResponse>({
  path,
  type,
  attributes,
  relationships,
  responseSchema,
  id,
  axios = defaultAxiosInstance,
  axiosConfig
}: PatchConfig<R>) {
  const response = await axios.patch<Response>(
    buildPath(path, id),
    {
      data: pickNonNullable({
        id,
        type,
        attributes,
        relationships:
          relationships &&
          mapValues(relationships, (value) => ({ data: value }))
      })
    },
    axiosConfig
  );

  return validateResponse(responseSchema, response.data);
}

/** Fetch a single resource */
export async function getOneResource<R extends ResolvedResponse>({
  path,
  id,
  responseSchema,
  query,
  axios = defaultAxiosInstance,
  axiosConfig
}: GetConfig<R>) {
  const appliedQuery = query ? buildQuery(query) : "";

  const response = await axios.get<Response>(
    buildPath(path, id) + appliedQuery,
    axiosConfig
  );

  return validateResponse(responseSchema, response.data);
}

/** Fetch a collection of resources */
export async function getManyResources<R extends ResolvedResponse>({
  path,
  responseSchema,
  query,
  axios = defaultAxiosInstance,
  axiosConfig
}: GetConfig<R>) {
  const appliedQuery = query ? buildQuery(query) : "";

  const response = await axios.get<Response>(path + appliedQuery, axiosConfig);

  return validateResponse(responseSchema, response.data);
}

/** Delete a single resource */
export async function deleteResource({
  id,
  path,
  axios = defaultAxiosInstance,
  axiosConfig
}: DeleteConfig) {
  return axios.delete(buildPath(path, id), axiosConfig);
}
