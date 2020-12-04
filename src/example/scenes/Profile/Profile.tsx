import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import React, { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";

import { Block } from "footer-templates-app/components/Block";
import { Title } from "footer-templates-app/components/Title";
import { selectCurrentAccount } from "footer-templates-app/domains/account/selectors";
import { useDispatch, useSelector } from "footer-templates-app/hooks/redux";

export const Profile: FunctionComponent = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const email = useSelector(selectCurrentAccount)?.attributes.email;

  const signOut = () =>
    dispatch({
      type: "signedOut"
    });

  return (
    <Block maxWidth="xs">
      <Grid container direction="column" spacing={4}>
        <Grid item container justify="center">
          <Title color="secondary">{t("scenes.Profile.title")}</Title>
        </Grid>
        <Grid item>
          <TextField
            value={email}
            label={t("fields.email")}
            variant="outlined"
            fullWidth
            disabled
          />
        </Grid>
        <Grid item container justify="center">
          <Button variant="contained" color="secondary" onClick={signOut}>
            {t("scenes.Profile.signOutButton")}
          </Button>
        </Grid>
      </Grid>
    </Block>
  );
};
