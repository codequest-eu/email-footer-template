import { useCallback } from "react";

export const useCopyToClipboard = (
  footerTemplateRef: React.MutableRefObject<HTMLDivElement | null>
) => {
  return useCallback(() => {
    if (!footerTemplateRef) {
      return;
    }

    if (!footerTemplateRef || !footerTemplateRef.current) {
      // eslint-disable-next-line no-console
      console.error("Please try again later");

      return;
    }

    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(footerTemplateRef.current);

    if (!selection) {
      return;
    }

    selection.removeAllRanges();
    selection.addRange(range);
    document.execCommand("copy");
    selection.removeAllRanges();
  }, [footerTemplateRef]);
};
