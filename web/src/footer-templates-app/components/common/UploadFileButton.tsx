import { FormHelperText } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import classNames from "classnames";
import React, { ChangeEvent, FunctionComponent } from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      marginTop: 20
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
  error: boolean;
  helperText: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const UploadFileButton: FunctionComponent<UploadFileButtonProps> = ({
  error,
  helperText,
  name,
  onChange
}) => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <FormHelperText error={error}>{helperText}</FormHelperText>
      <input
        name={name}
        accept="image/*"
        className={classes.input}
        id="button-file"
        multiple
        type="file"
        onChange={onChange}
      />
      <label htmlFor="button-file">
        <Button
          className={classNames(error && classes.buttonError)}
          variant="contained"
          color="primary"
          component="span"
        >
          Upload file
        </Button>
      </label>
    </div>
  );
};
