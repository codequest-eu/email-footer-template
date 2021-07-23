import Button from "@material-ui/core/Button/Button";
import FormHelperText from "@material-ui/core/FormHelperText";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import classNames from "classnames";
import { useField } from "formik";
import React, { ChangeEvent, FunctionComponent } from "react";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginBottom: 24
    },
    input: {
      display: "none"
    },
    buttonError: {
      borderWidth: 2,
      borderColor: theme.palette.error.main,
      borderStyle: "solid"
    }
  })
);

interface UploadFileButtonProps {
  name: string;
  errorText: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const UploadFileButton: FunctionComponent<UploadFileButtonProps> = ({
  errorText,
  name,
  onChange
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const [field, meta] = useField({ name });

  const isError = meta.touched && Boolean(meta.error);
  const { onBlur } = field;

  return (
    <div className={classes.root}>
      <input
        name={name}
        accept="image/*"
        className={classes.input}
        id="button-file"
        multiple
        type="file"
        onBlur={onBlur}
        onChange={onChange}
      />
      <label htmlFor="button-file">
        <Button
          className={classNames({ [classes.buttonError]: isError })}
          variant="contained"
          color="primary"
          component="span"
        >
          {t("uploadButton")}
        </Button>
      </label>
      {isError && <FormHelperText error>{errorText}</FormHelperText>}
    </div>
  );
};
