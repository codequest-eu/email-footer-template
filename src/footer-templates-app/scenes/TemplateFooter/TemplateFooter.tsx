/* eslint-disable no-console */
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { FormikProps } from "formik";
import React, { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";

import { Title } from "footer-templates-app/components/common/Title";
import { Form } from "footer-templates-app/components/Form/Form";
import { ImageCropper } from "footer-templates-app/components/ImageCropper/ImageCropper";
import { TemplateForm } from "footer-templates-app/components/TemplateForm/TemplateForm";
import { TemplatePreview } from "footer-templates-app/components/TemplatePreview/TemplatePreview";

import { TemplateFormValues } from "./types";

const initialValues: TemplateFormValues = {
  fullName: "",
  jobPosition: "",
  email: "",
  isPhoneEnabled: false,
  phoneNumber: "",
  image: {
    url: "",
    file: null
  }
};

export const TemplateFooter: FunctionComponent = () => {
  const { t } = useTranslation();

  const validationSchema = Yup.object({
    fullName: Yup.string().required(t("validation.required")),
    jobPosition: Yup.string().required(t("validation.required")),
    email: Yup.string()
      .required(t("validation.required"))
      .email(t("validation.email")),
    isPhoneEnabled: Yup.boolean(),
    phoneNumber: Yup.string(),
    image: Yup.object({
      file: Yup.mixed()
        .nullable()
        .test("filePresent", t("validation.required"), (file: File | null) => {
          return file && file.name ? true : false;
        })
    })
  });

  return (
    <Grid container direction="row" spacing={3}>
      <Grid container item justify="center">
        <Title color="secondary">{"Footer template"}</Title>
      </Grid>

      <Grid container item>
        <Form
          initialValues={initialValues}
          onSubmit={(values) => {
            console.log(values);
          }}
          validationSchema={validationSchema}
          validateOnBlur={false}
          validateOnChange={false}
        >
          {(formikProps: FormikProps<TemplateFormValues>) => (
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <TemplateForm formikProps={formikProps} />
              </Grid>

              <Grid item md={8}>
                <TemplatePreview templateFormValues={formikProps.values} />
              </Grid>

              <Grid item xs={12}>
                <ImageCropper image={formikProps.values.image} />
              </Grid>

              <Grid container item xs={12} justify="flex-end">
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => ({})}
                >
                  {t("scenes.Profile.signOutButton")}
                </Button>
              </Grid>
            </Grid>
          )}
        </Form>
      </Grid>
    </Grid>
  );
};
