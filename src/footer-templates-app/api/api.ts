import Axios, { AxiosTransformer } from "axios";
import * as humps from "humps";

import { Jsonapi } from "footer-templates-app/utils/jsonapi";

export const axios = Axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  transformRequest: [
    (data) => (data instanceof FormData ? data : humps.decamelizeKeys(data)),
    ...(Axios.defaults.transformRequest as AxiosTransformer[])
  ],
  transformResponse: [
    ...(Axios.defaults.transformResponse as AxiosTransformer[]),
    (data) => (data instanceof Blob ? data : humps.camelizeKeys(data))
  ],
  headers: {
    "Content-Type": "application/vnd.api+json",
    // Prevents CSRF attacks
    // https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html#use-of-custom-request-headers
    "X-Everything-Is-Ok": "true"
  }
});

export const jsonapi = Jsonapi(axios);
