import { useCallback } from "react";

export const useCopyToClipboard = (
  footerTemplateRef: React.MutableRefObject<HTMLDivElement | null>
) => {
  return useCallback(async () => {
    if (!footerTemplateRef || !footerTemplateRef.current) {
      // eslint-disable-next-line no-console
      console.error("Please try again later");
      return;
    }

    const htmlContent = footerTemplateRef.current.innerHTML;
    const textContent =
      footerTemplateRef.current.textContent ??
      footerTemplateRef.current.innerText ??
      "";

    const clipboardItem = new ClipboardItem({
      "text/html": new Blob([htmlContent], { type: "text/html" }),
      "text/plain": new Blob([textContent], { type: "text/plain" })
    });

    await navigator.clipboard.write([clipboardItem]);
  }, [footerTemplateRef]);
};
