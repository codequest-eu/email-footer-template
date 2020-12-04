import { AxiosResponse } from "axios";
import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import { axios } from "footer-templates-app/api/api";
import { rootReducer } from "footer-templates-app/domains/rootReducer";
import { Response } from "footer-templates-app/utils/jsonapi/types";

export function makeStore(reducer?: typeof rootReducer) {
  const store = createStore(reducer || rootReducer, composeWithDevTools({})());

  axios.interceptors.response.use(
    (response: AxiosResponse<Response | undefined>) => {
      if (!response.data) {
        return response;
      }

      const dataResources = response.data.data || [];

      const appliedDataResources = Array.isArray(dataResources)
        ? dataResources
        : [dataResources];

      const includedResources = Array.isArray(response.data.included)
        ? response.data.included
        : [];

      const resources = [...appliedDataResources, ...includedResources];

      if (resources.length > 0) {
        store.dispatch({
          type: "resourcesFetched",
          payload: {
            resources
          }
        });
      }

      return response;
    }
  );

  return store;
}

export type Dispatch = ReturnType<typeof makeStore>["dispatch"];

export type Store = ReturnType<typeof makeStore>;
