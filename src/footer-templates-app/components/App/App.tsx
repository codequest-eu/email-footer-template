import DateFnsUtils from "@date-io/date-fns";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { History } from "history";
import React, { FunctionComponent } from "react";
import { Router } from "react-router-dom";

import { SnackbarProvider } from "footer-templates-app/components/common/SnackbarProvider/SnackbarProvider";
import { theme } from "footer-templates-app/config/theme";

import { Layout } from "../Layout/Layout";
import { Routes } from "../Router/Routes";

interface ProviderProps {
  history: History;
}

export const Providers: FunctionComponent<ProviderProps> = ({
  children,
  history
}) => (
  <Router history={history}>
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Layout>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <SnackbarProvider>{children}</SnackbarProvider>
        </MuiPickersUtilsProvider>
      </Layout>
    </MuiThemeProvider>
  </Router>
);

export const App = ({ history }: ProviderProps) => (
  <Providers history={history}>
    <Routes />
  </Providers>
);
