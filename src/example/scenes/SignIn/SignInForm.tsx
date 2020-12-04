import Grid from "@material-ui/core/Grid";
import { useSnackbar } from "notistack";
import React, { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import * as yup from "yup";

import * as authApi from "footer-templates-app/api/authApi";
import { Form } from "footer-templates-app/components/formik/Form";
import { TextField } from "footer-templates-app/components/formik/TextField";
import { LoadableButton } from "footer-templates-app/components/LoadableButton";
import { useAsyncCallback } from "footer-templates-app/hooks/async";
import { getErrorStatus } from "footer-templates-app/utils/errors";

const SignInValidationSchema = yup
  .object({
    email: yup
      .string()
      .email("validation.email")
      .required("validation.required"),
    password: yup.string().required("validation.required")
  })
  .required();

const SignInInitialValues = {
  email: "",
  password: ""
};

export const SignInForm: FunctionComponent = () => {
  const snackbar = useSnackbar();
  const { t } = useTranslation();

  const signIn = useAsyncCallback(authApi.signIn, {
    onError: (error) => {
      const errorStatus = getErrorStatus(error);

      if (errorStatus === 401) {
        return snackbar.enqueueSnackbar(
          t("scenes.SignIn.errors.invalidCredentials"),
          {
            variant: "error"
          }
        );
      }

      return snackbar.enqueueSnackbar(t("errors.somethingWentWrong"), {
        variant: "error"
      });
    }
  });

  return (
    <Form
      initialValues={SignInInitialValues}
      validationSchema={SignInValidationSchema}
      onSubmit={signIn.execute}
    >
      <Grid item container spacing={4} direction="column">
        <Grid item xs={12}>
          <TextField
            testId="EmailTextField"
            name="email"
            label={t("fields.email")}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            testId="PasswordTextField"
            name="password"
            label={t("fields.password")}
            type="password"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} container justify="center">
          <LoadableButton
            variant="contained"
            color="primary"
            isLoading={signIn.loading}
          >
            {t("scenes.SignIn.signInButton")}
          </LoadableButton>
        </Grid>
      </Grid>
    </Form>
  );
};
