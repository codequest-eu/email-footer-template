import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import React, { FunctionComponent } from "react";

import { LanguageToggler } from "../LanguageToggler/LanguageToggler";
import { Navigation } from "../Navigation";
import { InternalLink } from "../Router/links/InternalLink";

const useStyles = makeStyles(
  (theme) => ({
    root: {
      backgroundColor: theme.palette.custom.darkGrey,
      width: "100%"
    },
    logo: {
      width: 32,
      marginTop: 3
    }
  }),
  { name: "Header" }
);

export const Header: FunctionComponent = () => {
  const classes = useStyles();

  return (
    <Box component="header" p={1} mb={5} className={classes.root}>
      <Container>
        <Grid justify="space-between" container>
          <Grid item container xs={12} md={9} alignItems="center">
            <InternalLink to="/">
              <img
                className={classes.logo}
                src="/logo.png"
                alt="codoquest logo"
              />
            </InternalLink>
            <Box mr={10}>
              <Navigation />
            </Box>
          </Grid>
          <Grid item container xs={12} md={3} justify="flex-end">
            <LanguageToggler />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
