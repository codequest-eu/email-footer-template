import get from "lodash/get";

export interface ApiError {
  code: string;
  detail: string;
  source: unknown;
  status: string;
  title: string;
}

/**
 * Returns error's status code if possible (-1 otherwise).
 */
export function getErrorStatus(err: unknown) {
  const errorStatusCode = Number(get(err, "response.status", -1));
  return errorStatusCode;
}

/**
 * It extracts api errors from the error response.
 */
export function getApiErrors(err: unknown) {
  const errors = get(err, "response.data.errors", []) as Array<ApiError>;

  return errors.map((eachError: ApiError) => ({
    code: eachError.code || "",
    detail: eachError.detail || "",
    source: eachError.source || {},
    status: eachError.status || "",
    title: eachError.title || ""
  })) as ApiError[];
}
