import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import { FormikProps } from "formik";
import React, { ChangeEvent, FunctionComponent, useCallback } from "react";
import { useTranslation } from "react-i18next";

import { Field } from "footer-templates-app/components/common/Field";
import { Title } from "footer-templates-app/components/common/Title";
import { UploadFileButton } from "footer-templates-app/components/common/UploadFileButton";
import { ImageCropper } from "footer-templates-app/components/ImageCropper/ImageCropper";

import { TemplateFormValues } from "../types";

interface TemplateFormProps {
  formikProps: FormikProps<TemplateFormValues>;
}

export const TemplateForm: FunctionComponent<TemplateFormProps> = ({
  formikProps
}) => {
  const { errors, handleChange, values } = formikProps;
  const { t } = useTranslation();

  const handleUploadFile = useCallback(
    (formikProps: TemplateFormProps["formikProps"]) => (
      event: ChangeEvent<HTMLInputElement>
    ) => {
      if (event.target && event.target.files && event.target.files[0]) {
        const uploadedFile = event.target.files[0];

        const fileReader = new FileReader();

        fileReader.onloadend = () => {
          formikProps.setFieldValue("previewImage", {
            url: fileReader.result,
            file: uploadedFile
          });
        };

        fileReader.readAsDataURL(uploadedFile);
      }
    },
    []
  );

  return (
    <>
      <Grid item xs={12}>
        <Title>{t("scenes.TemplateFooter.form")}</Title>
      </Grid>
      <Grid item xs={12}>
        <Field name="fullName" />
      </Grid>
      <Grid item xs={12}>
        <Field name="jobPosition" />
      </Grid>
      <Grid item xs={12}>
        <Field name="email" />
      </Grid>
      <Grid item xs={12}>
        <FormControlLabel
          control={
            <Checkbox
              name="isPhoneEnabled"
              value={values.isPhoneEnabled}
              onChange={handleChange}
            />
          }
          label={t("fields.phoneNumberEnable")}
        />
      </Grid>
      {values.isPhoneEnabled && (
        <Grid item xs={12}>
          <Field name="phoneNumber" />
        </Grid>
      )}
      <Grid item xs={12}>
        <FormControlLabel
          control={
            <Checkbox
              name="isImageEnabled"
              value={values.isImageEnabled}
              onChange={handleChange}
            />
          }
          label={t("fields.imageEnable")}
        />
      </Grid>
      {values.isImageEnabled && (
        <>
          <Grid item xs={12}>
            <UploadFileButton
              name="previewImage.file"
              errorText={
                (errors.previewImage && errors.previewImage.file) || ""
              }
              onChange={handleUploadFile(formikProps)}
            />
          </Grid>
          <Grid item xs={12}>
            {formikProps.values.previewImage.url && (
              <>
                <ImageCropper
                  url={formikProps.values.previewImage.url}
                  setCroppedImage={(croppedImage: string) =>
                    formikProps.setFieldValue("previewImage", {
                      ...formikProps.values.previewImage,
                      cropped: croppedImage
                    })
                  }
                />
              </>
            )}
          </Grid>
        </>
      )}
    </>
  );
};
