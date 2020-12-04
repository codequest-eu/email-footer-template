import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem, { MenuItemProps } from "@material-ui/core/MenuItem";
import MuiSelect, {
  SelectProps as MuiSelectProps
} from "@material-ui/core/Select";
import React from "react";

export type SelectItemValue = MenuItemProps["value"];

export interface SelectItem {
  key: string;
  value: string;
  label: React.ReactNode;
}
export interface SelectProps {
  items: Array<SelectItem>;
  value: string;
  onChange: (
    event: React.ChangeEvent<{ name?: string; value: string }>,
    child: React.ReactNode
  ) => void;
  onBlur?: MuiSelectProps["onBlur"];
  name?: string;
  label?: string;
  isInvalid?: boolean;
  helperText?: React.ReactNode;
}

export const Select = ({
  items,
  value,
  onChange,
  onBlur,
  name,
  label,
  isInvalid,
  helperText
}: SelectProps) => (
  <FormControl>
    <InputLabel error={isInvalid}>{label}</InputLabel>
    <MuiSelect
      value={value}
      onChange={onChange as MuiSelectProps["onChange"]}
      name={name}
      onBlur={onBlur}
    >
      {items.map((eachItem) => (
        <MenuItem key={eachItem.key} value={eachItem.value}>
          {eachItem.label}
        </MenuItem>
      ))}
    </MuiSelect>
    {helperText && (
      <FormHelperText error={isInvalid}>{helperText}</FormHelperText>
    )}
  </FormControl>
);
