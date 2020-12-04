import { useSnackbar } from "notistack";
import { useAsyncCallback as useDefaultAsyncCallback } from "react-async-hook";
import { useTranslation } from "react-i18next";

export const useAsyncCallback: typeof useDefaultAsyncCallback = (
  promiseFn,
  options
) => {
  const { t } = useTranslation();
  const snackbar = useSnackbar();

  return useDefaultAsyncCallback(promiseFn, {
    onError: (err) => {
      snackbar.enqueueSnackbar(t("errors.somethingWentWrong"), {
        variant: "error"
      });

      // eslint-disable-next-line no-console
      console.error(err);
    },
    ...options
  });
};
