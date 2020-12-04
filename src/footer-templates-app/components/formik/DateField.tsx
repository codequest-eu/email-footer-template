import "date-fns";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { useField } from "formik";
import React from "react";

interface DataFieldProps {
  name: string;
  label?: string;
}

export const DateField: React.FC<DataFieldProps> = ({ name, label }) => {
  const [{ onChange, ...field }, meta, helpers] = useField({ name });
  const isInvalid = !!(meta.touched && meta.error);

  return (
    <KeyboardDatePicker
      format="MM/dd/yyyy"
      label={label}
      KeyboardButtonProps={{
        "aria-label": "change date"
      }}
      onChange={(date) => helpers.setValue(date)}
      InputLabelProps={{
        shrink: !!field.value
      }}
      helperText={isInvalid ? meta.error : null}
      error={isInvalid}
      fullWidth
      {...field}
    />
  );
};
