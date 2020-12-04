import { makeStyles } from "@material-ui/core";
import React, { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";

import { selectIsAuthenticated } from "footer-templates-app/domains/session/selectors";
import { useSelector } from "footer-templates-app/hooks/redux";

import { InternalLink } from "../links/InternalLink";

const useStyles = makeStyles({
  root: {
    display: "flex"
  },
  link: {
    listStyleType: "none",
    marginLeft: 5
  }
});

export const Navigation: FunctionComponent = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  if (isAuthenticated) {
    return (
      <ul className={classes.root}>
        <li className={classes.link}>
          <InternalLink to="/">{t("navigation.home")}</InternalLink>
        </li>
        <li className={classes.link}>
          <InternalLink to="/todo-list">
            {t("navigation.todoList")}
          </InternalLink>
        </li>
      </ul>
    );
  }

  return null;
};
