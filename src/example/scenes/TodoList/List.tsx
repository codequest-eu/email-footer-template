import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import MuiList from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import DeleteIcon from "@material-ui/icons/DeleteForever";
import React, { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";

import { selectTodos } from "footer-templates-app/domains/todo/selectors";
import { useSelector } from "footer-templates-app/hooks/redux";

import { Message } from "./Message";

export const List: FunctionComponent = () => {
  const { t } = useTranslation();
  const todos = useSelector(selectTodos);

  if (todos.length === 0) {
    return <Message>{t("scenes.TodoList.emptyList")}</Message>;
  }

  return (
    <MuiList>
      {todos.map(({ attributes }, i) => (
        <ListItem key={i} data-testid="todo">
          <ListItemText>{attributes.memo}</ListItemText>
          <ListItemSecondaryAction>
            <Checkbox color="primary" checked={attributes.isCompleted} />
            <IconButton color="secondary">
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </MuiList>
  );
};
