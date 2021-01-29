import Box from "@material-ui/core/Box";
import Container, { ContainerProps } from "@material-ui/core/Container";
import makeStyles from "@material-ui/core/styles/makeStyles";
import React, { FunctionComponent, ReactNode } from "react";

interface BlockProps {
  maxWidth: ContainerProps["maxWidth"];
  children: NonNullable<ReactNode>;
}

const useStyles = makeStyles(
  (theme) => ({
    root: {
      backgroundColor: theme.palette.custom.lightGrey
    }
  }),
  { name: "Block" }
);

export const Block: FunctionComponent<BlockProps> = ({
  children,
  maxWidth
}) => {
  const classes = useStyles();
  return (
    <Container maxWidth={maxWidth} className={classes.root}>
      <Box pt={5} pb={5} pl={1} pr={1}>
        {children}
      </Box>
    </Container>
  );
};
