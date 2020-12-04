import Box from "@material-ui/core/Box";
import React, { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";

import { Block } from "footer-templates-app/components/Block";
import { Title } from "footer-templates-app/components/Title";

import { SignUpForm } from "./SignUpForm";

export const SignUp: FunctionComponent = () => {
  const { t } = useTranslation();
  return (
    <Block maxWidth="xs">
      <Box p={3}>
        <Title>{t("scenes.SignUp.title")}</Title>
      </Box>
      <Box p={3}>
        <SignUpForm />
      </Box>
    </Block>
  );
};
