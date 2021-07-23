import { createStyles, makeStyles } from "@material-ui/core/styles";
import React, { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";

import { InternalLink } from "./Router/links/InternalLink";

const useStyles = makeStyles(({ typography, spacing }) =>
  createStyles({
    root: {
      display: "flex"
    },
    listItem: {
      listStyleType: "none",
      marginLeft: spacing(3)
    },
    link: {
      fontSize: typography.pxToRem(14),
      fontWeight: "bold",
      color: "white",
      textDecoration: "none",
      textTransform: "uppercase",
      "&:hover": {
        color: "#c8c8c8"
      }
    }
  })
);

export const Navigation: FunctionComponent = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <ul className={classes.root}>
      <li className={classes.listItem}>
        <InternalLink to="/" classes={{ root: classes.link }}>
          {t("navigation.home")}
        </InternalLink>
      </li>
      <li className={classes.listItem}>
        <InternalLink to="/instruction" classes={{ root: classes.link }}>
          {t("navigation.instruction")}
        </InternalLink>
      </li>
    </ul>
  );
};
