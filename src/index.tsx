import { createBrowserHistory } from "history";
import React from "react";
import ReactDOM from "react-dom";

import "footer-templates-app/config/i18next";

import { makeStore } from "footer-templates-app/config/store/store";

import { App } from "./example/components/App/App";

const history = createBrowserHistory({
  basename: process.env.REACT_APP_BASENAME
});

const renderApp = () =>
  ReactDOM.render(
    <App store={makeStore()} history={history} />,
    document.getElementById("root")
  );

renderApp();

if (module.hot) {
  module.hot.accept("./example/components/App/App", () => {
    renderApp();
  });
}
