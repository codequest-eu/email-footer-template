import update from "immutability-helper";
import { Reducer } from "redux";

import { TodoResource } from "footer-templates-app/api/schemas/todo";

import { GlobalAction } from "../types";
import { mapByIds, pickType } from "../utils";

import { TodoState } from "./types";

export const todoInitialState: TodoState = {
  resources: {}
};

export const todoReducer: Reducer<TodoState, GlobalAction> = (
  state = todoInitialState,
  action
) => {
  switch (action.type) {
    case "resourcesFetched": {
      return update(state, {
        resources: {
          $merge: mapByIds(
            action.payload.resources.filter(pickType<TodoResource>("todo"))
          )
        }
      });
    }

    default:
      return state;
  }
};
