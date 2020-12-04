import qs from "qs";
import * as yup from "yup";

import { PaginationBase, parseQuery } from "./parseQuery";

const minPageNumber = 1;
const minPageSize = 1;

export function usePagination<T extends PaginationBase>(
  options: {
    paginationDefaults?: PaginationBase;
    queryParams?: {
      schema: yup.ObjectSchema<T>;
      defaults: T;
    };
    totalItems?: number;
  } = {}
) {
  const totalItems = options.totalItems || 0;
  const { location } = window;

  const queryParams = options.queryParams
    ? options.queryParams.schema
    : yup.object({});

  const paginationDefaults = options.paginationDefaults || {
    number: 1,
    size: 10
  };

  const schema = queryParams
    .shape({
      number: yup.number().min(minPageNumber).required(),
      size: yup.number().min(minPageSize).required()
    })
    .required();

  const defaults = options.queryParams
    ? { ...paginationDefaults, ...options.queryParams.defaults }
    : paginationDefaults;

  const currentQuery = parseQuery(location.search, {
    schema,
    defaults
  });

  const prefix = `${location.pathname}?`;

  function buildUrl(
    callback: (prevQuery: typeof currentQuery) => Partial<typeof currentQuery>
  ) {
    const nextQuery = { ...defaults, ...callback(currentQuery) };
    const stringifiedQuery = qs.stringify(nextQuery, {
      skipNulls: true,
      encode: false
    });
    return `${prefix}${stringifiedQuery}`;
  }

  const maxPageNumber = Math.ceil(totalItems / currentQuery.size);

  const isOnLastPage = currentQuery.number === maxPageNumber;

  const nextPageUrl = buildUrl((prevQuery) => ({
    ...prevQuery,
    number:
      prevQuery.number < maxPageNumber ? prevQuery.number + 1 : prevQuery.number
  }));

  const prevPageUrl = buildUrl((prevQuery) => ({
    ...prevQuery,
    number:
      prevQuery.number > minPageNumber ? prevQuery.number - 1 : minPageNumber
  }));

  const isOnFirstPage = currentQuery.number === minPageNumber;

  return {
    currentQuery,
    nextPageUrl,
    prevPageUrl,
    buildUrl,
    maxPageNumber,
    isOnLastPage,
    isOnFirstPage
  };
}
