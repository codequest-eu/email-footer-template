import {
  Checkbox,
  createStyles,
  FormControlLabel,
  Grid,
  makeStyles,
  TextField,
  Theme
} from "@material-ui/core";
import classNames from "classnames";
import { FormikProps } from "formik";
import React, { ChangeEvent, FunctionComponent } from "react";
import { useTranslation } from "react-i18next";

import { TemplateFormValues } from "../../scenes/TemplateFooter/types";
import { Title } from "../common/Title";
import { UploadFileButton } from "../common/UploadFileButton";
import { ImageCropper } from "../ImageCropper/ImageCropper";

interface TemplateFormProps {
  formikProps: FormikProps<TemplateFormValues>;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    field: {
      marginBottom: theme.spacing(3)
    },
    fieldError: {
      marginBottom: 0
    }
  })
);

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
  const { touched, errors, handleChange, handleBlur, values } = formikProps;
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <>
      <Grid item xs={12}>
        <Title>{t("scenes.TemplateFooter.mainTitle")}</Title>
      </Grid>
      <Grid item xs={12}>
        <TextField
          label={t("fields.fullName")}
          name="fullName"
          error={touched.fullName && Boolean(errors.fullName)}
          helperText={
            touched.fullName && Boolean(errors.fullName) ? errors.fullName : ""
          }
          onChange={handleChange}
          onBlur={handleBlur}
          variant="outlined"
          fullWidth
          className={classNames([
            classes.field,
            touched.fullName && Boolean(errors.fullName) && classes.fieldError
          ])}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label={t("fields.jobPosition")}
          name="jobPosition"
          value={values.jobPosition}
          error={Boolean(errors.jobPosition)}
          helperText={errors.jobPosition}
          onChange={handleChange}
          onBlur={handleBlur}
          variant="outlined"
          fullWidth
          className={classNames([
            classes.field,
            errors.jobPosition && classes.fieldError
          ])}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label={t("fields.email")}
          name="email"
          value={values.email}
          error={Boolean(errors.email)}
          helperText={errors.email}
          onChange={handleChange}
          onBlur={handleBlur}
          variant="outlined"
          fullWidth
          className={classNames([
            classes.field,
            errors.email && classes.fieldError
          ])}
        />
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
      <Grid item xs={12}>
        <TextField
          label={t("fields.phoneNumber")}
          name="phoneNumber"
          value={values.phoneNumber}
          error={touched.phoneNumber && Boolean(errors.phoneNumber)}
          helperText={touched.phoneNumber && errors.phoneNumber}
          onChange={handleChange}
          onBlur={handleBlur}
          variant="outlined"
          fullWidth
          disabled={values.isPhoneEnabled === false}
          className={classNames([
            classes.field,
            errors.phoneNumber && classes.fieldError
          ])}
        />
      </Grid>
      <Grid item xs={12}>
        {formikProps.values.image.url && (
          <ImageCropper url={formikProps.values.image.url} />
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
