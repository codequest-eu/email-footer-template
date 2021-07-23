import Container, { ContainerProps } from "@material-ui/core/Container";
import makeStyles from "@material-ui/core/styles/makeStyles";
import React, { FunctionComponent, ReactNode } from "react";

import { Footer } from "./Footer";
import { Header } from "./Header";

interface LayoutProps {
  maxWidth?: ContainerProps["maxWidth"];
  children: NonNullable<ReactNode>;
}

const useStyles = makeStyles(
  {
    container: {
      display: "flex",
      flex: 1,
      flexDirection: "column"
    }
  },
  { name: "Layout" }
);

export const Layout: FunctionComponent<LayoutProps> = ({ children }) => {
  const classes = useStyles();

  return (
    <>
      <Header />
      <Container className={classes.container} component="main">
        {children}
      </Container>
      <Footer />
    </>
  );
};
