import { createContext, useContext } from "react";

import { LambdaClient } from "./lambda-client";

interface ApiService {
  lambda: LambdaClient | void;
}

const ApiServiceContext = createContext<ApiService>({
  get lambda(): never {
    throw new Error("Api service is not defined");
  }
});

export const ApiServiceProvider = ApiServiceContext.Provider;

export const useApiService = () => {
  return useContext(ApiServiceContext);
};
