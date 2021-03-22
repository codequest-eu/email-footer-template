import makeStyles from "@material-ui/core/styles/makeStyles";

export const useLinkStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.primary.dark,
    "&:hover": {
      color: theme.palette.primary.light
    }
  }
}));
