import { combineReducers, Reducer } from "redux";

import { accountInitialState, accountReducer } from "./account/reducer";
import { AccountState } from "./account/types";
import { sessionInitialState, sessionReducer } from "./session/reducer";
import { SessionState } from "./session/types";
import { todoInitialState, todoReducer } from "./todo/reducer";
import { TodoState } from "./todo/types";
import { GlobalAction } from "./types";
import { userInitialState, userReducer } from "./user/reducer";
import { UserState } from "./user/types";

export interface RootState {
  user: UserState;
  account: AccountState;
  session: SessionState;
  todo: TodoState;
}

export const initialState: RootState = {
  user: userInitialState,
  account: accountInitialState,
  session: sessionInitialState,
  todo: todoInitialState
};

export const rootReducer: Reducer<RootState, GlobalAction> = (
  state,
  action
) => {
  // Clean up all stores when signed out here,
  // so we don't need to handle it in any particular reducer.
  if (action.type === "signedOut") {
    return initialState;
  }

  return combineReducers({
    user: userReducer,
    account: accountReducer,
    session: sessionReducer,
    todo: todoReducer
  })(state, action);
};
