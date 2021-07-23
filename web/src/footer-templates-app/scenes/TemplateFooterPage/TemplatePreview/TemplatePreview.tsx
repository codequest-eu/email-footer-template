import Paper from "@material-ui/core/Paper";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React, { forwardRef } from "react";
import { useTranslation } from "react-i18next";

import { Title } from "footer-templates-app/components/common/Title";

import { TemplateFormValues } from "../types";

import { getEmailTemplate } from "./getEmailTemplate";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      margin: "0 auto",
      padding: theme.spacing(2),
      width: "100%",
      minWidth: 300,
      maxWidth: 550
    }
  })
);

type TemplatePreviewProps = TemplateFormValues;

export const TemplatePreview = forwardRef<HTMLDivElement, TemplatePreviewProps>(
  (props, ref) => {
    const { t } = useTranslation();

    const classes = useStyles();

    return (
      <>
        <Title>{t("scenes.TemplateFooter.previewTitle")}</Title>
        <Paper className={classes.paper}>
          <div
            ref={ref}
            dangerouslySetInnerHTML={{
              // eslint-disable-next-line @typescript-eslint/naming-convention
              __html: getEmailTemplate({
                ...props
              })
            }}
          />
        </Paper>
      </>
    );
  }
);
