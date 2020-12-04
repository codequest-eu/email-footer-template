import { AxiosInstance } from "axios";

import {
  createResource,
  deleteResource,
  getManyResources,
  getOneResource,
  updateResource
} from "footer-templates-app/utils/jsonapi/requests";
import {
  DeleteConfig,
  GetConfig,
  PatchConfig,
  PostConfig,
  ResolvedResponse
} from "footer-templates-app/utils/jsonapi/types";

export function Jsonapi(axios: AxiosInstance) {
  return {
    create: <R extends ResolvedResponse>(config: PostConfig<R>) =>
      createResource({ axios, ...config }),

    update: <R extends ResolvedResponse>(config: PatchConfig<R>) =>
      updateResource({ axios, ...config }),

    get: <R extends ResolvedResponse>(config: GetConfig<R>) =>
      getOneResource({ axios, ...config }),

    getMany: <R extends ResolvedResponse>(config: GetConfig<R>) =>
      getManyResources({ axios, ...config }),

    delete: (config: DeleteConfig) => deleteResource({ axios, ...config })
  };
}
