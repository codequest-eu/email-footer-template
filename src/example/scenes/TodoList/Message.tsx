import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import React, { FunctionComponent } from "react";

export const Message: FunctionComponent = ({ children }) => {
  return (
    <Grid container justify="center">
      <Grid item>
        <Typography>{children}</Typography>
      </Grid>
    </Grid>
  );
};
