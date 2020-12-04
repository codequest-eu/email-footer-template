import React, { FunctionComponent } from "react";
import { useAsync } from "react-async-hook";
import { useTranslation } from "react-i18next";

import { getManyTodos } from "footer-templates-app/api/todosApi";

import { List } from "./List";
import { Message } from "./Message";
import { SkeletonList } from "./SkeletonList";

export const Content: FunctionComponent = () => {
  const { t } = useTranslation();

  const todosRequest = useAsync(getManyTodos, []);

  if (todosRequest.error) {
    return <Message>{t("errors.somethingWentWrong")}</Message>;
  }

  if (todosRequest.result) {
    return <List />;
  }

  return <SkeletonList />;
};
