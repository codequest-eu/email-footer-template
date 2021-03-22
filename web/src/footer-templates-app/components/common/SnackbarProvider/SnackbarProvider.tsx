import IconButton from "@material-ui/core/IconButton";
import DismissIcon from "@material-ui/icons/CloseRounded";
import {
  SnackbarProvider as NotistackProvider,
  WithSnackbarProps
} from "notistack";
import React, { useRef } from "react";

import { SNACKBAR_HIDE_DURATION_MS } from "footer-templates-app/config/consts";

export const SnackbarProvider: React.FC = ({ children }) => {
  const notistackRef = useRef<WithSnackbarProps>();

  const onClickDismiss = (key?: string | number) => () => {
    if (notistackRef.current) {
      notistackRef.current.closeSnackbar(key);
    }
  };

  return (
    <NotistackProvider
      ref={notistackRef}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      autoHideDuration={SNACKBAR_HIDE_DURATION_MS}
      action={(key) => (
        <IconButton onClick={onClickDismiss(key)}>
          <DismissIcon />
        </IconButton>
      )}
    >
      {children}
    </NotistackProvider>
  );
};
