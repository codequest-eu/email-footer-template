import { render as rtlRender } from "@testing-library/react";
import { createBrowserHistory, History } from "history";
import React, { ReactNode } from "react";

import { makeStore, Store } from "footer-templates-app/config/store/store";

import { Providers } from "../components/App/App";

import "footer-templates-app/config/i18next";

export function testRender({
  jsx,
  history = createBrowserHistory({
    basename: process.env.REACT_APP_BASENAME
  }),
  store = makeStore()
}: {
  jsx: ReactNode;
  history?: History;
  store?: Store;
}) {
  return rtlRender(
    <Providers store={store} history={history}>
      {jsx}
    </Providers>
  );
}
