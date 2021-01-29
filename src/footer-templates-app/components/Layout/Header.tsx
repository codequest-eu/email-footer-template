import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import React, { FunctionComponent } from "react";

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

interface HeaderProps {
  navigation?: React.ReactNode;
}

export const Header: FunctionComponent<HeaderProps> = ({ navigation }) => {
  const classes = useStyles();

  return (
    <Box component="header" p={1} mb={5} className={classes.root}>
      <Container>
        <Grid justify="space-between" container>
          <Grid item container xs={12} sm={3} alignItems="center">
            <InternalLink to="/">
              <img
                className={classes.logo}
                src="/logo.png"
                alt="codoquest logo"
              />
            </InternalLink>
          </Grid>
          <Grid
            item
            container
            xs={12}
            sm={9}
            justify="flex-end"
            alignItems="center"
          >
            {navigation}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
