import React, { FunctionComponent } from "react";

import { selectIsAuthenticated } from "footer-templates-app/domains/session/selectors";
import { useSelector } from "footer-templates-app/hooks/redux";

import { ConditionalRoute, UnknownRouteComponent } from "./ConditionalRoute";

interface ProtectedRouteProps {
  path: string;
  componentWhenAuthenticated: UnknownRouteComponent;
  componentWhenNotAuthenticated: UnknownRouteComponent;
  exact?: boolean;
}

export const ProtectedRoute: FunctionComponent<ProtectedRouteProps> = ({
  componentWhenAuthenticated,
  componentWhenNotAuthenticated,
  path,
  exact
}) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return (
    <ConditionalRoute
      condition={isAuthenticated}
      componentWhenTrue={componentWhenAuthenticated}
      componentWhenFalse={componentWhenNotAuthenticated}
      path={path}
      exact={exact}
    />
  );
};
