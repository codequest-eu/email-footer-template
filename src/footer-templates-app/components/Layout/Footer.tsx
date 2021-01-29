import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import React, { FunctionComponent } from "react";

import { ExternalLink } from "../Router/links/ExternalLink";

const useStyles = makeStyles(
  (theme) => ({
    root: {
      minHeight: theme.spacing(10),
      backgroundColor: theme.palette.custom.lightGrey
    },
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "wrap",
      [theme.breakpoints.up("sm")]: {
        justifyContent: "space-between"
      }
    },
    madeWithLove: {
      display: "flex",
      alignItems: "center",
      "& img": {
        display: "block",
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1)
      },
      marginTop: theme.spacing(1),
      [theme.breakpoints.up("sm")]: {
        marginTop: 0
      }
    }
  }),
  { name: "Footer" }
);

export const Footer: FunctionComponent = () => {
  const classes = useStyles();
  return (
    <Box component="footer" mt={5} p={3} className={classes.root}>
      <Container className={classes.container}>
        <Typography variant="subtitle2" component="span">
          codequest &copy; {new Date().getFullYear()}
        </Typography>
        <Typography
          component="div"
          variant="subtitle2"
          className={classes.madeWithLove}
        >
          made with <img src="/love.png" alt="heart" /> by
          <ExternalLink to="https://codequest.com">
            <img src="/logo-small.png" alt="codequest logo" />
          </ExternalLink>
        </Typography>
      </Container>
    </Box>
  );
};
