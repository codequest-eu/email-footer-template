import CircularProgress, {
  CircularProgressProps
} from "@material-ui/core/CircularProgress";
import React from "react";

interface Props extends CircularProgressProps {
  isVisible?: boolean;
  mountHidden?: boolean;
  className?: string;
}

export const Loader: React.FC<Props> = ({
  isVisible = true,
  mountHidden = true,
  className,
  ...props
}) => {
  if (mountHidden) {
    return (
      <CircularProgress
        classes={{ root: className }}
        style={{ opacity: isVisible ? 1 : 0 }}
        {...props}
      />
    );
  }

  return isVisible ? <CircularProgress {...props} /> : null;
};
