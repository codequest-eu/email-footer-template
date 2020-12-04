import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { useField } from "formik";
import React from "react";

interface CheckboxFieldProps {
  name: string;
  label?: string;
}

const useStyles = makeStyles(
  () => ({
    errorText: {
      marginTop: "0"
    }
  }),
  { name: "CheckboxField" }
);

export const CheckboxField: React.FC<CheckboxFieldProps> = ({
  name,
  label
}) => {
  const classes = useStyles();
  const [field, meta] = useField({ name });
  const isInvalid = !!(meta.touched && meta.error);

  return (
    <div>
      <FormControlLabel label={label} control={<Checkbox {...field} />} />{" "}
      {isInvalid && (
        <FormHelperText classes={{ root: classes.errorText }} error={true}>
          {meta.error}
        </FormHelperText>
      )}
    </div>
  );
};
