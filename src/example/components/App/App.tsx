import DateFnsUtils from "@date-io/date-fns";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { History } from "history";
import React, { FunctionComponent } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { Router } from "react-router-dom";
import { Store } from "redux";

import { SnackbarProvider } from "footer-templates-app/components/SnackbarProvider/SnackbarProvider";
import { theme } from "footer-templates-app/config/theme";

import { Layout } from "../Layout/Layout";
import { Routes } from "../Routes";

import { Navigation } from "./Navigation";

interface ProviderProps {
  store: Store;
  history: History;
}

export const Providers: FunctionComponent<ProviderProps> = ({
  children,
  store,
  history
}) => (
  <ReduxProvider store={store}>
    <Router history={history}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Layout navigation={<Navigation />}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <SnackbarProvider>{children}</SnackbarProvider>
          </MuiPickersUtilsProvider>
        </Layout>
      </MuiThemeProvider>
    </Router>
  </ReduxProvider>
);

export const App = ({ store, history }: ProviderProps) => (
  <Providers store={store} history={history}>
    <Routes />
  </Providers>
);
