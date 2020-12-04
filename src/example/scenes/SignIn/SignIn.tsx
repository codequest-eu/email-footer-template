import Box from "@material-ui/core/Box";
import React, { FunctionComponent } from "react";
import { Trans, useTranslation } from "react-i18next";

import { Block } from "footer-templates-app/components/Block";
import { Title } from "footer-templates-app/components/Title";

import { InternalLink } from "../../components/links/InternalLink";

import { SignInForm } from "./SignInForm";

export const SignIn: FunctionComponent = () => {
  const { t } = useTranslation();
  return (
    <Block maxWidth="xs">
      <Box p={3}>
        <Title>{t("scenes.SignIn.title")}</Title>
      </Box>
      <Box p={3}>
        <SignInForm />
      </Box>
      <Box p={3} textAlign="center">
        <Trans
          i18nKey="scenes.SignIn.signUp"
          components={[<InternalLink to="/sign-up" />]}
        />
      </Box>
    </Block>
  );
};
