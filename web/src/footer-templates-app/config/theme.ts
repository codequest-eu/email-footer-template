import { createMuiTheme } from "@material-ui/core/styles";

const defaultTheme = createMuiTheme();

/**
 * Custom theme definition which is provided to the Material UI.
 * Check https://material-ui.com/customization/default-theme for the defaults
 * Global styles can be also overridden here.
 */
export const theme = createMuiTheme({
  // When adding custom properties here you have to override
  // default type definitions for theme.
  // Checkout src/footer-templates-app/types/overrides.d.ts file for examples
  palette: {
    custom: {
      darkGrey: "#28282a",
      lightGrey: "#f5f5f5"
    },
    primary: {
      main: "#5d84e8",
      light: "#93b3ff",
      dark: "#1958b5"
    }
  },
  props: {
    MuiButtonBase: {
      disableRipple: true
    }
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        html: {
          height: "100%",
          minHeight: "100vh"
        },
        body: {
          height: "100%",
          overflowX: "hidden"
        },
        // eslint-disable-next-line @typescript-eslint/naming-convention
        "#__next, #root": {
          height: "100%",
          display: "flex",
          flexDirection: "column"
        }
      }
    },
    MuiButton: {
      contained: {
        minWidth: 200,
        padding: 15,
        boxShadow: "none",
        "&:hover": {
          boxShadow: "none"
        },
        borderRadius: 0
      }
    },
    MuiOutlinedInput: {
      root: {
        borderRadius: "0",
        backgroundColor: defaultTheme.palette.common.white
      }
    }
  }
});
