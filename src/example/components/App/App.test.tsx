import { render } from "@testing-library/react";
import { createMemoryHistory } from "history";
import React from "react";

import { makeStore } from "footer-templates-app/config/store/store";
import "footer-templates-app/config/i18next";

import { App } from "./App";

describe("App", () => {
  it("should render without crashing", () => {
    render(<App store={makeStore()} history={createMemoryHistory()} />);
  });
});
