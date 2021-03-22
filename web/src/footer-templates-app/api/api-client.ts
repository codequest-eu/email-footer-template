import Axios, { AxiosRequestConfig } from "axios";

export const createApiClient = (options: AxiosRequestConfig) => {
  const client = Axios.create(options);

  return client;
};
