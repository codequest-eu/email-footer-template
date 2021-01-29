import { createBrowserHistory } from "history";
import React from "react";
import ReactDOM from "react-dom";

import "footer-templates-app/config/i18next";

import { App } from "./footer-templates-app/components/App/App";

const history = createBrowserHistory({
  basename: process.env.REACT_APP_BASENAME
});

const renderApp = () =>
  ReactDOM.render(<App history={history} />, document.getElementById("root"));

renderApp();

if (module.hot) {
  module.hot.accept("./footer-templates-app/components/App/App", () => {
    renderApp();
  });
}
