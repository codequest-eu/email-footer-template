import { FormHelperText } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React, { ChangeEvent, FunctionComponent } from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& > *": {
        margin: theme.spacing(1)
      }
    },
    input: {
      display: "none"
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
    <div className={classes.root}>
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
        <Button variant="contained" color="primary" component="span">
          Upload
        </Button>
      </label>
    </div>
  );
};
