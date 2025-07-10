import Grid from "@material-ui/core/Grid";
import { Form, Formik, FormikHelpers, FormikProps } from "formik";
import React, { FunctionComponent, useCallback, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import * as yup from "yup";

import { useApiService } from "footer-templates-app/api/api-context";
import { Title } from "footer-templates-app/components/common/Title";
import { TemplateForm } from "footer-templates-app/scenes/TemplateFooterPage/TemplateForm/TemplateForm";
import { TemplatePreview } from "footer-templates-app/scenes/TemplateFooterPage/TemplatePreview/TemplatePreview";

import { LoadableButton } from "../../components/common/LoadableButton";

import { TemplateFormValues } from "./types";
import { useCopyToClipboard } from "./useCopyToClipboard";

const initialValues: TemplateFormValues = {
  fullName: "",
  jobPosition: "",
  email: "",
  isPhoneEnabled: false,
  phoneNumber: "",
  isImageEnabled: false,
  uploadedImageUrl: null,
  previewImage: {
    cropped: "",
    url: "",
    file: null
  }
};

export const TemplateFooterPage: FunctionComponent = () => {
  const { t } = useTranslation();
  const { lambda } = useApiService();
  const footerTemplateRef = useRef<HTMLDivElement | null>(null);
  const copyToClipboard = useCopyToClipboard(footerTemplateRef);
  const [isLoading, setIsLoading] = useState(false);

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
    isImageEnabled: yup.boolean(),
    previewImage: yup.object().when("isImageEnabled", {
      is: true,
      then: yup.object({
        file: yup
          .mixed()
          .test(
            "filePresent",
            t("validation.required"),
            (file: File | null) => {
              return file && file.name ? true : false;
            }
          )
      }),
      otherwise: yup.object({
        file: yup.mixed().nullable()
      })
    })
  });

  const handleSubmit = useCallback(
    async (
      values: TemplateFormValues,
      { setSubmitting, setFieldValue }: FormikHelpers<TemplateFormValues>
    ) =>
      // eslint-disable-next-line @typescript-eslint/require-await
      {
        setIsLoading(true);
        setSubmitting(true);

        try {
          if (values.isImageEnabled) {
            const { data } = await lambda.uploadImage(
              values.previewImage.cropped
            );

            if (!data) {
              return;
            }

            await new Promise<void>((resolve) =>
              setTimeout(() => resolve(), 4000)
            );

            await setFieldValue("uploadedImageUrl", data.imageUrl);
          }
          copyToClipboard();
        } catch (error) {
          // eslint-disable-next-line no-console
          console.log(error);
        }

        setSubmitting(false);
        setIsLoading(false);
      },
    [copyToClipboard, lambda]
  );

  return (
    <Grid container direction="row">
      <Grid container item justify="center">
        <Title color="secondary">{t("scenes.TemplateFooter.mainTitle")}</Title>
      </Grid>
      <Grid container item>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
          validateOnBlur={true}
          validateOnChange={false}
        >
          {(formikProps: FormikProps<TemplateFormValues>) => (
            <Form>
              <Grid container spacing={1}>
                <Grid item xs={12} md={4}>
                  <Grid container>
                    <TemplateForm formikProps={formikProps} />
                  </Grid>
                </Grid>

                <Grid item md={8}>
                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                      <TemplatePreview
                        ref={footerTemplateRef}
                        {...formikProps.values}
                      />
                    </Grid>
                    <Grid container item xs={12} justify="center">
                      <Grid container item xs={8} justify="space-between">
                        <LoadableButton
                          isLoading={isLoading}
                          variant="contained"
                          color="secondary"
                        >
                          {t("scenes.TemplateFooter.copyFooterButton")}
                        </LoadableButton>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Grid>
    </Grid>
  );
};
