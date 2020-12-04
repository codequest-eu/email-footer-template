import update from "immutability-helper";
import { Reducer } from "redux";

import { UserResource } from "footer-templates-app/api/schemas/user";

import { GlobalAction } from "../types";
import { mapByIds, pickType } from "../utils";

import { UserState } from "./types";

export const userInitialState: UserState = {
  resources: {}
};

export const userReducer: Reducer<UserState, GlobalAction> = (
  state = userInitialState,
  action
) => {
  switch (action.type) {
    case "resourcesFetched": {
      return update(state, {
        resources: {
          $merge: mapByIds(
            action.payload.resources.filter(pickType<UserResource>("user"))
          )
        }
      });
    }

    default:
      return state;
  }
};
