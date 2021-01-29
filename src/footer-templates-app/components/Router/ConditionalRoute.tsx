import React, { FunctionComponent } from "react";
import { Route } from "react-router";
import { RouteComponentProps } from "react-router-dom";

export type UnknownRouteComponent =
  | React.ComponentType<unknown>
  | React.ComponentType<
      RouteComponentProps<Record<string, string | undefined>>
    >;

export interface ConditionalRouteProps {
  condition: boolean;
  componentWhenTrue: UnknownRouteComponent;
  componentWhenFalse: UnknownRouteComponent;
  exact?: boolean;
  path: string;
}

export const ConditionalRoute: FunctionComponent<ConditionalRouteProps> = ({
  condition,
  componentWhenTrue,
  componentWhenFalse,
  exact,
  path
}) => (
  <Route
    component={condition ? componentWhenTrue : componentWhenFalse}
    exact={exact}
    path={path}
  />
);
