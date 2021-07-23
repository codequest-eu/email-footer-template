import React, { FunctionComponent } from "react";
import { Route, Switch } from "react-router-dom";

import { InstructionPage } from "footer-templates-app/scenes/InstructionPage/InstructionPage";
import { TemplateFooterPage } from "footer-templates-app/scenes/TemplateFooterPage/TemplateFooterPage";

export const Routes: FunctionComponent = () => {
  return (
    <Switch>
      <Route path="/" exact={true} component={TemplateFooterPage} />
      <Route path="/instruction" exact={true} component={InstructionPage} />
      <Route path="*">404</Route>
    </Switch>
  );
};
