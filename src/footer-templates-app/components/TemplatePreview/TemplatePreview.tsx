import Grid from "@material-ui/core/Grid";
import React, { FunctionComponent } from "react";

import { HTMLTemplate } from "./HTMLTemplate";

export const TemplatePreview: FunctionComponent = () => {
  return (
    <Grid container direction="row" spacing={3}>
      <HTMLTemplate />
    </Grid>
  );
};
