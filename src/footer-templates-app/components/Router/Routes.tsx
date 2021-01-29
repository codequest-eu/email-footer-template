import React, { FunctionComponent } from "react";
import { Route, Switch } from "react-router-dom";

import { TemplateFooter } from "../../scenes/TemplateFooter";

export const Routes: FunctionComponent = () => {
  return (
    <Switch>
      <Route path="/" exact={true} component={TemplateFooter} />
      <Route path="*">404</Route>
    </Switch>
  );
};
