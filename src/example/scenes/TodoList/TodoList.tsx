import Container from "@material-ui/core/Container";
import React, { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";

import { Block } from "footer-templates-app/components/Block";
import { Title } from "footer-templates-app/components/Title";

import { Content } from "./Content";

export const TodoList: FunctionComponent = () => {
  const { t } = useTranslation();

  return (
    <Block maxWidth="xl">
      <Title>{t("scenes.TodoList.title")}</Title>
      <Container maxWidth="md">
        <Content />
      </Container>
    </Block>
  );
};
