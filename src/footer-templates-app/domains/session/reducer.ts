import update from "immutability-helper";
import { Reducer } from "redux";

import { SessionResource } from "footer-templates-app/api/schemas/session";

import { GlobalAction } from "../types";
import { pickType } from "../utils";

import { SessionState } from "./types";

export const sessionInitialState: SessionState = {
  resource: null
};

export const sessionReducer: Reducer<SessionState, GlobalAction> = (
  state = sessionInitialState,
  action
) => {
  switch (action.type) {
    case "resourcesFetched": {
      const session = action.payload.resources.find(
        pickType<SessionResource>("session")
      );

      if (session) {
        return update(state, {
          resource: {
            $set: session
          }
        });
      }

      return state;
    }

    default:
      return state;
  }
};
