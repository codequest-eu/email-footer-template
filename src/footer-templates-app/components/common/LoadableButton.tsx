import Button, { ButtonProps } from "@material-ui/core/Button";
import React, { FunctionComponent } from "react";

import { Loader } from "./Loader";

export interface LoadableButtonProps {
  isLoading: boolean;
  variant?: ButtonProps["variant"];
  color?: ButtonProps["color"];
}

export const LoadableButton: FunctionComponent<LoadableButtonProps> = ({
  isLoading = false,
  children,
  ...props
}) => {
  return (
    <Button type="submit" disabled={isLoading} {...props}>
      {isLoading ? <Loader /> : children}
    </Button>
  );
};
