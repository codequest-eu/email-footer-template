import DateFnsUtils from "@date-io/date-fns";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { History } from "history";
import React, { FunctionComponent } from "react";
import { Router } from "react-router-dom";

import { ApiServiceProvider } from "footer-templates-app/api/api-context";
import { createLambdaClient } from "footer-templates-app/api/lambda-client";
import { SnackbarProvider } from "footer-templates-app/components/common/SnackbarProvider/SnackbarProvider";
import { Layout } from "footer-templates-app/components/Layout/Layout";
import { Routes } from "footer-templates-app/components/Router/Routes";
import { theme } from "footer-templates-app/config/theme";

interface ProviderProps {
  history: History;
}

const lambdaApiClient = createLambdaClient();

export const Providers: FunctionComponent<ProviderProps> = ({
  children,
  history
}) => (
  <ApiServiceProvider value={{ lambda: lambdaApiClient }}>
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
  </ApiServiceProvider>
);

export const App = ({ history }: ProviderProps) => (
  <Providers history={history}>
    <Routes />
  </Providers>
);
