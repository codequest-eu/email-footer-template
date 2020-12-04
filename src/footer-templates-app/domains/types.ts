import { Resource } from "footer-templates-app/utils/jsonapi/types";

import { SessionAction } from "./session/types";
import { PayloadAction } from "./utils";

export type GlobalAction =
  | PayloadAction<
      "resourcesFetched",
      {
        resources: Resource[];
      }
    >
  | SessionAction;
