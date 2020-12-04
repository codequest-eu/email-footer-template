import update from "immutability-helper";
import { Reducer } from "redux";

import { AccountResource } from "footer-templates-app/api/schemas/account";

import { GlobalAction } from "../types";
import { mapByIds, pickType } from "../utils";

import { AccountState } from "./types";

export const accountInitialState: AccountState = {
  resources: {}
};

export const accountReducer: Reducer<AccountState, GlobalAction> = (
  state = accountInitialState,
  action
) => {
  switch (action.type) {
    case "resourcesFetched": {
      return update(state, {
        resources: {
          $merge: mapByIds(
            action.payload.resources.filter(
              pickType<AccountResource>("account")
            )
          )
        }
      });
    }

    default:
      return state;
  }
};
