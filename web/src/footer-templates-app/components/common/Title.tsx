import Box from "@material-ui/core/Box";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import React, { FunctionComponent } from "react";

interface TitleProps {
  color?: "primary" | "secondary";
  marginBottom?: number;
}

const useStyles = makeStyles(
  (theme) => ({
    root: {
      padding: 0,
      margin: 0,
      fontFamily: "'Oswald', 'Roboto', sans-serif",
      textTransform: "uppercase",
      textAlign: "center",
      display: "block",
      letterSpacing: 2,
      "&:after": {
        content: "' '",
        borderBottom: ({ color = "primary" }: TitleProps) =>
          `5px solid ${theme.palette[color].main}`,
        paddingBottom: theme.spacing(1),
        width: theme.spacing(15),
        height: theme.spacing(3),
        display: "block",
        margin: "0 auto"
      }
    }
  }),
  { name: "Title" }
);

export const Title: FunctionComponent<TitleProps> = ({
  children,
  color = "primary",
  marginBottom = 5
}) => {
  const classes = useStyles({ color });
  return (
    <Box marginBottom={marginBottom}>
      <Typography
        variant="h4"
        component="h2"
        classes={{
          root: classes.root
        }}
        data-testid="title"
      >
        {children}
      </Typography>
    </Box>
  );
};
