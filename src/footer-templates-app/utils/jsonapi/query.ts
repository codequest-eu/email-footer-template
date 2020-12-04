import { decamelize, decamelizeKeys } from "humps";
import qs from "qs";

import { QueryParameters } from "./types";

export function createIncludeList(
  includeConfig: QueryParameters["include"],
  prefix = ""
) {
  if (!includeConfig) {
    return "";
  }

  return Object.keys(includeConfig)
    .reduce((acc: string[], key) => {
      let result = "";
      const currentInclude = includeConfig[key];

      if (currentInclude instanceof Object) {
        const nestedInclude = createIncludeList(
          currentInclude,
          prefix ? `${prefix}${key}.` : `${key}.`
        );
        result = `${nestedInclude}`;
      } else {
        result = `${prefix}${key}`;
      }

      return [...acc, result];
    }, [])
    .join(",");
}

export function buildQuery(configParam: QueryParameters) {
  const config = {
    filter: {} as NonNullable<QueryParameters["filter"]>,
    sort: [] as NonNullable<QueryParameters["sort"]>,
    include: {} as NonNullable<QueryParameters["include"]>,
    fields: [] as NonNullable<QueryParameters["fields"]>,
    ...configParam
  };

  const sort = config.sort.join(",");
  const include = createIncludeList(config.include);
  const fields = config.fields.join(",");
  const query = qs.stringify(
    {
      filter: decamelizeKeys(config.filter),
      sort: sort.length > 0 ? decamelize(sort) : undefined,
      include: include.length > 0 ? decamelize(include) : undefined,
      page: config.pagination,
      fields: fields.length ? decamelize(fields) : undefined
    },
    { encode: false, arrayFormat: "comma" }
  );

  return `?${query}`;
}
