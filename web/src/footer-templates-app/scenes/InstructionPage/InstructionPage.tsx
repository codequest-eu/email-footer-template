import Grid from "@material-ui/core/Grid/index";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import React from "react";
import { useTranslation } from "react-i18next";

import instruction_1_en from "footer-templates-app/assets/instructions/instruction_1_en.png";
import instruction_2_en from "footer-templates-app/assets/instructions/instruction_2_en.png";
import instruction_3_en from "footer-templates-app/assets/instructions/instruction_3_en.png";
import instruction_4_en from "footer-templates-app/assets/instructions/instruction_4_en.png";
import instruction_5_en from "footer-templates-app/assets/instructions/instruction_5_en.png";
import instruction_7_en from "footer-templates-app/assets/instructions/instruction_7_en.png";

const useStyles = makeStyles(
  ({ typography }) =>
    createStyles({
      contentContainer: {
        maxWidth: 600,
        width: "100%"
      },
      image: {
        height: "auto",
        width: "100%"
      },
      text: {
        fontSize: typography.pxToRem(16),
        fontWeight: "bold"
      }
    }),
  {
    name: "InstructionPage"
  }
);

export const InstructionPage = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Grid container direction="column" alignItems="center" spacing={10}>
      <Grid item>
        <Grid
          container
          spacing={2}
          direction="column"
          classes={{ root: classes.contentContainer }}
        >
          <Grid item>
            <span className={classes.text}>
              {t("scenes.InstructionPage.instruction.1")}
            </span>
          </Grid>
          <Grid item>
            <img
              className={classes.image}
              src={instruction_1_en}
              alt="instruction 1"
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid
          container
          spacing={2}
          direction="column"
          classes={{ root: classes.contentContainer }}
        >
          <Grid item>
            <span className={classes.text}>
              {t("scenes.InstructionPage.instruction.2")}
            </span>
          </Grid>
          <Grid item>
            <img
              className={classes.image}
              src={instruction_2_en}
              alt="instruction 2"
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid
          container
          spacing={2}
          direction="column"
          classes={{ root: classes.contentContainer }}
        >
          <Grid item>
            <span className={classes.text}>
              {t("scenes.InstructionPage.instruction.3")}
            </span>
          </Grid>
          <Grid item>
            <img
              className={classes.image}
              src={instruction_3_en}
              alt="instruction 3"
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid
          container
          spacing={2}
          direction="column"
          classes={{ root: classes.contentContainer }}
        >
          <Grid item>
            <span className={classes.text}>
              {t("scenes.InstructionPage.instruction.4")}
            </span>
          </Grid>
          <Grid item>
            <img
              className={classes.image}
              src={instruction_4_en}
              alt="instruction 4"
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid
          container
          spacing={2}
          direction="column"
          classes={{ root: classes.contentContainer }}
        >
          <Grid item>
            <span className={classes.text}>
              {t("scenes.InstructionPage.instruction.5")}
            </span>
          </Grid>
          <Grid item>
            <img
              className={classes.image}
              src={instruction_5_en}
              alt="instruction 5"
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid
          container
          spacing={2}
          direction="column"
          classes={{ root: classes.contentContainer }}
        >
          <Grid item>
            <span className={classes.text}>
              {t("scenes.InstructionPage.instruction.6")}
            </span>
          </Grid>
          <Grid item>
            <img
              className={classes.image}
              src={instruction_7_en}
              alt="instruction 7"
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
