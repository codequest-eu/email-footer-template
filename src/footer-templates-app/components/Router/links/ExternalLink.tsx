import classNames from "classnames";
import React from "react";

import { useLinkStyles } from "./useLinkStyles";

interface ExternalLinkProps {
  classes?: {
    root?: string;
  };
  external?: boolean;
  targetBlank?: boolean;
  to: string;
}

export const ExternalLink: React.FC<ExternalLinkProps> = ({
  children,
  targetBlank = true,
  to,
  classes
}) => {
  const linkClasses = useLinkStyles();

  return (
    <a
      className={classNames(linkClasses.root, classes?.root)}
      href={to}
      rel="noreferrer noopener"
      {...(targetBlank ? { target: "_blank" } : {})}
    >
      {children}
    </a>
  );
};
