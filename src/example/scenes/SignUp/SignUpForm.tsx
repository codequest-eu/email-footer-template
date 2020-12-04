import { Box } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import React, { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import * as yup from "yup";

import * as authApi from "footer-templates-app/api/authApi";
import { Form } from "footer-templates-app/components/formik/Form";
import { TextField } from "footer-templates-app/components/formik/TextField";
import { LoadableButton } from "footer-templates-app/components/LoadableButton";
import { useAsyncCallback } from "footer-templates-app/hooks/async";

import { InternalLink } from "../../components/links/InternalLink";

const SignUpValidationSchema = yup
  .object({
    email: yup
      .string()
      .email("validation.email")
      .required("validation.required"),
    password: yup.string().required("validation.required")
  })
  .required();

const SignUpInitialValues = {
  email: "",
  password: ""
};

export const SignUpForm: FunctionComponent = () => {
  const { t } = useTranslation();

  const signUp = useAsyncCallback(authApi.signUp);

  if (signUp.result) {
    const { email } = signUp.result.data.attributes;
    return (
      <Box textAlign="center">
        {t("scenes.SignUp.confirmAccount", { email })}
      </Box>
    );
  }

  return (
    <Form
      initialValues={SignUpInitialValues}
      validationSchema={SignUpValidationSchema}
      onSubmit={signUp.execute}
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
            isLoading={signUp.loading}
          >
            {t("common.submit")}
          </LoadableButton>
        </Grid>
        <Grid item xs={12} container justify="center">
          <InternalLink to="/">{t("common.back")}</InternalLink>
        </Grid>
      </Grid>
    </Form>
  );
};
