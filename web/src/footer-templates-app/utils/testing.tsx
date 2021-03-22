import { render as rtlRender } from "@testing-library/react";
import { createBrowserHistory, History } from "history";
import React, { ReactNode } from "react";

import { Providers } from "../components/App/App";

import "footer-templates-app/config/i18next";

export function testRender({
  jsx,
  history = createBrowserHistory({
    basename: process.env.REACT_APP_BASENAME
  })
}: {
  jsx: ReactNode;
  history?: History;
}) {
  return rtlRender(<Providers history={history}>{jsx}</Providers>);
}
