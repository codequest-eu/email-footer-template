import Container, { ContainerProps } from "@material-ui/core/Container";
import makeStyles from "@material-ui/core/styles/makeStyles";
import React, { FunctionComponent, ReactNode } from "react";

import { Footer } from "./Footer";
import { Header } from "./Header";

interface LayoutProps {
  maxWidth?: ContainerProps["maxWidth"];
  children: NonNullable<ReactNode>;
  navigation?: React.ReactNode;
}

const useStyles = makeStyles(
  {
    container: {
      height: "100%",
      display: "flex",
      flexDirection: "column"
    }
  },
  { name: "Layout" }
);

export const Layout: FunctionComponent<LayoutProps> = ({
  children,
  navigation
}) => {
  const classes = useStyles();

  return (
    <>
      <Header navigation={navigation} />
      <Container className={classes.container} component="main">
        {children}
      </Container>
      <Footer />
    </>
  );
};
