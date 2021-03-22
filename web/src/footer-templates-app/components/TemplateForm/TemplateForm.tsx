import { Checkbox, FormControlLabel, Grid } from "@material-ui/core";
import { FormikProps } from "formik";
import React, { ChangeEvent, FunctionComponent } from "react";
import { useTranslation } from "react-i18next";

import { TemplateFormValues } from "../../scenes/TemplateFooter/types";
import { Field } from "../common/Field";
import { Title } from "../common/Title";
import { UploadFileButton } from "../common/UploadFileButton";
import { ImageCropper } from "../ImageCropper/ImageCropper";

interface TemplateFormProps {
  formikProps: FormikProps<TemplateFormValues>;
}

const handleUploadFile = (formikProps: TemplateFormProps["formikProps"]) => (
  event: ChangeEvent<HTMLInputElement>
) => {
  if (event.target && event.target.files && event.target.files[0]) {
    const uploadedFile = event.target.files[0];

    const fileReader = new FileReader();

    fileReader.onloadend = () => {
      formikProps.setFieldValue("image", {
        url: fileReader.result,
        file: uploadedFile
      });
    };
    fileReader.readAsDataURL(uploadedFile);
  }
};

export const TemplateForm: FunctionComponent<TemplateFormProps> = ({
  formikProps
}) => {
  const { errors, handleChange, values } = formikProps;
  const { t } = useTranslation();

  return (
    <>
      <Grid item xs={12}>
        <Title>{t("scenes.TemplateFooter.mainTitle")}</Title>
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
        {formikProps.values.image.url && (
          <ImageCropper
            url={formikProps.values.image.url}
            setCroppedImage={(url: string) =>
              formikProps.setFieldValue("image", {
                ...formikProps.values.image,
                cropped: url
              })
            }
          />
        )}
        <UploadFileButton
          name="imageUrl"
          helperText={(errors.image && errors.image.file) || ""}
          error={Boolean(errors.image?.file)}
          onChange={handleUploadFile(formikProps)}
        />
      </Grid>
    </>
  );
};
