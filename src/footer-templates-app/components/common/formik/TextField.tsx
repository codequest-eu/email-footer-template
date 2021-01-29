import MuiTextField, {
  TextFieldProps as MuiTextFieldProps
} from "@material-ui/core/TextField";
import { useField } from "formik";
import isNil from "lodash/isNil";
import React from "react";
import { useTranslation } from "react-i18next";

export interface TextFieldProps {
  name: string;
  type?: "text" | "number" | "email" | "password";
  label: MuiTextFieldProps["label"];
  fullWidth?: MuiTextFieldProps["fullWidth"];
  testId?: string;
}

export const TextField: React.FC<TextFieldProps> = ({
  name,
  type,
  testId,
  ...propsRest
}) => {
  const { t } = useTranslation();
  const [{ value, ...fieldRest }, meta] = useField<string>({ name });
  const isInvalid = !!(meta.touched && meta.error);

  return (
    <MuiTextField
      error={isInvalid}
      helperText={isInvalid && meta.error ? t(meta.error) : " "}
      type={type}
      value={isNil(value) ? "" : value}
      variant="outlined"
      inputProps={{
        "data-testid": testId
      }}
      {...propsRest}
      {...fieldRest}
    />
  );
};
