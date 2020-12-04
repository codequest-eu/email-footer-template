import React, { FunctionComponent } from "react";
import { Route, Switch } from "react-router-dom";

import { Profile } from "../scenes/Profile/Profile";
import { SignIn } from "../scenes/SignIn/SignIn";
import { SignUp } from "../scenes/SignUp/SignUp";
import { TodoList } from "../scenes/TodoList/TodoList";

import { ProtectedRoute } from "./ProtectedRoute";

export const Routes: FunctionComponent = () => {
  return (
    <Switch>
      <ProtectedRoute
        path="/"
        exact={true}
        componentWhenAuthenticated={Profile}
        componentWhenNotAuthenticated={SignIn}
      />
      <ProtectedRoute
        path="/todo-list"
        exact={true}
        componentWhenAuthenticated={TodoList}
        componentWhenNotAuthenticated={SignIn}
      />
      <ProtectedRoute
        path="/sign-up"
        exact={true}
        componentWhenAuthenticated={Profile}
        componentWhenNotAuthenticated={SignUp}
      />
      <Route path="*">404</Route>
    </Switch>
  );
};
