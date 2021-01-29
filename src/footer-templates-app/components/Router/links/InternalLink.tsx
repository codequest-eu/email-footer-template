import classNames from "classnames";
import React from "react";
import { Link, LinkProps } from "react-router-dom";

import { useLinkStyles } from "./useLinkStyles";

interface InternalLinkProps extends LinkProps {
  classes?: {
    root?: string;
  };
  to: string;
}

export const InternalLink: React.FC<InternalLinkProps> = ({
  children,
  classes,
  ...props
}) => {
  const linkClasses = useLinkStyles();

  return (
    <Link className={classNames(linkClasses.root, classes?.root)} {...props}>
      {children}
    </Link>
  );
};
