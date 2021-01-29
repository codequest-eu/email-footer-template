import { useField } from "formik";
import React from "react";

import { Select, SelectProps } from "../Select/Select";

interface SelectFieldProps {
  name: string;
  label?: string;
  items: SelectProps["items"];
}

export const SelectField = ({ name, label, items }: SelectFieldProps) => {
  const [{ onChange, ...field }, meta, helpers] = useField({ name });
  const isInvalid = !!(meta.touched && meta.error);

  return (
    <Select
      label={label}
      items={items}
      onChange={(event) => helpers.setValue(event.target.value)}
      isInvalid={isInvalid}
      helperText={isInvalid ? meta.error : null}
      {...field}
    />
  );
};
