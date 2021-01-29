import CircularProgress from "@material-ui/core/CircularProgress";
import React from "react";

interface Props {
  isVisible?: boolean;
  mountHidden?: boolean;
}

export const Loader: React.FC<Props> = ({
  isVisible = true,
  mountHidden = true
}) => {
  if (mountHidden) {
    return <CircularProgress style={{ opacity: isVisible ? 1 : 0 }} />;
  }

  return isVisible ? <CircularProgress /> : null;
};
