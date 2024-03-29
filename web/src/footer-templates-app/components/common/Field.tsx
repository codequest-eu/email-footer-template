import { createStyles, makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import classNames from "classnames";
import { useField } from "formik";
import React, { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";

interface Props {
  name: string;
}

const useStyles = makeStyles(({ spacing }) =>
  createStyles({
    field: {
      marginBottom: spacing(3)
    },
    fieldError: {
      marginBottom: spacing(0.5)
    }
  })
);

export const Field: FunctionComponent<Props> = ({ name }) => {
  const { t } = useTranslation();
  const classes = useStyles();

  const [field, meta] = useField({ name });

  const isError = meta.touched && Boolean(meta.error);
  const { onChange, onBlur } = field;

  return (
    <TextField
      label={t(`fields.${field.name}`)}
      name={field.name}
      error={isError}
      helperText={isError && meta.error}
      onChange={onChange}
      onBlur={onBlur}
      variant="outlined"
      fullWidth
      className={classNames([classes.field, isError && classes.fieldError])}
    />
  );
};
