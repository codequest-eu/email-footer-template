/* eslint-disable no-console */
import {
  Checkbox,
  createStyles,
  FormControlLabel,
  makeStyles,
  TextField,
  Theme
} from "@material-ui/core";
import classNames from "classnames";
import { FormikProps } from "formik";
import React, { ChangeEvent, FunctionComponent } from "react";
import { useTranslation } from "react-i18next";

import { TemplateFormValues } from "../../scenes/TemplateFooter/types";
import { UploadFileButton } from "../common/UploadFileButton";

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
    const uploadedFile =
      event.target && event.target.files && event.target.files[0];

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
      <TextField
        label={t("fields.fullName")}
        name="fullName"
        error={touched.fullName && Boolean(errors.fullName)}
        helperText={errors.fullName}
        onChange={handleChange}
        onBlur={handleBlur}
        variant="outlined"
        fullWidth
        className={classNames([
          classes.field,
          errors.fullName && classes.fieldError
        ])}
      />
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
      <UploadFileButton
        name="imageUrl"
        helperText={(errors.image && errors.image.file) || ""}
        error={Boolean(errors.image?.file)}
        onChange={handleUploadFile(formikProps)}
      />
    </>
  );
};
