import { createStyles, makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { FormikProps } from "formik";
import React, { FunctionComponent, useCallback } from "react";
import { useTranslation } from "react-i18next";
import * as yup from "yup";

import { Title } from "footer-templates-app/components/common/Title";
import { Form } from "footer-templates-app/components/Form/Form";
import { TemplateForm } from "footer-templates-app/components/TemplateForm/TemplateForm";
import { TemplatePreview } from "footer-templates-app/components/TemplatePreview/TemplatePreview";

import { TemplateFormValues } from "./types";

const useStyles = makeStyles(() =>
  createStyles({
    downloadLink: {
      textDecoration: "none"
    },
    fieldError: {
      marginBottom: 0
    }
  })
);

const initialValues: TemplateFormValues = {
  fullName: "",
  jobPosition: "",
  email: "",
  isPhoneEnabled: false,
  phoneNumber: "",
  image: {
    url: "",
    cropped: "",
    file: null
  }
};

export const TemplateFooter: FunctionComponent = () => {
  const { t } = useTranslation();
  const classes = useStyles();

  const validationSchema = yup.object({
    fullName: yup.string().required(t("validation.required")),
    jobPosition: yup.string().required(t("validation.required")),
    email: yup
      .string()
      .required(t("validation.required"))
      .email(t("validation.email")),
    isPhoneEnabled: yup.boolean(),
    phoneNumber: yup.string().when("isPhoneEnabled", {
      is: true,
      then: yup.string().required(t("validation.required"))
    }),
    image: yup.object({
      file: yup
        .mixed()
        .nullable()
        .test("filePresent", t("validation.required"), (file: File | null) => {
          return file && file.name ? true : false;
        })
    })
  });

  const handleSubmit = useCallback(
    (formikProps: FormikProps<TemplateFormValues>) => async () => {
      await formikProps.submitForm();
    },
    []
  );

  return (
    <Grid container direction="row" spacing={3}>
      <Grid container item justify="center">
        <Title color="secondary">{t("scenes.TemplateFooter.mainTitle")}</Title>
      </Grid>

      <Grid container item>
        <Form
          initialValues={initialValues}
          onSubmit={(values) => {
            // eslint-disable-next-line no-console
            console.log(values);
          }}
          validationSchema={validationSchema}
          validateOnBlur={true}
          validateOnChange={false}
        >
          {(formikProps: FormikProps<TemplateFormValues>) => (
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Grid container spacing={1}>
                  <TemplateForm formikProps={formikProps} />
                </Grid>
              </Grid>

              <Grid item md={8}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TemplatePreview templateFormValues={formikProps.values} />
                  </Grid>
                  <Grid container item xs={12} justify="center">
                    <Grid container item xs={8} justify="space-between">
                      <a
                        id="download"
                        download="avatar.png"
                        href="/"
                        className={classes.downloadLink}
                      >
                        <Button variant="contained" color="secondary">
                          {t("scenes.TemplateFooter.downloadButton")}
                        </Button>
                      </a>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleSubmit(formikProps)}
                      >
                        {t("scenes.TemplateFooter.copyFooterButton")}
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          )}
        </Form>
      </Grid>
    </Grid>
  );
};
