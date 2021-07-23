import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import { createStyles, makeStyles } from "@material-ui/styles";
import React, { FunctionComponent, MouseEvent, useState } from "react";
import { useTranslation } from "react-i18next";

import { availableLocales } from "../../config/i18next";

const useStyles = makeStyles(
  () =>
    createStyles({
      label: {
        color: "white"
      }
    }),
  {
    name: "LanguageToggler"
  }
);

export const LanguageToggler: FunctionComponent = () => {
  const classes = useStyles();
  const { i18n } = useTranslation();

  const [language, setLanguage] = useState("en");

  const setNewLanguage = (_: MouseEvent<HTMLElement>, language: string) => {
    setLanguage(language);
    void i18n.changeLanguage(language);
  };

  return (
    <ToggleButtonGroup
      value={language}
      onChange={setNewLanguage}
      exclusive
      aria-label="text formatting"
    >
      {availableLocales.map((language) => (
        <ToggleButton
          key={language}
          value={language}
          aria-label={language}
          classes={{ label: classes.label }}
        >
          {language}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};
