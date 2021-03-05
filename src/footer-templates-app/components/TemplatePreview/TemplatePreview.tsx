import { Paper } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React, { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";

import { TemplateFormValues } from "../../scenes/TemplateFooter/types";
import { Title } from "../common/Title";

import { getEmailTemplate } from "./getEmailTemplate";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      margin: "0 auto",
      padding: theme.spacing(2),
      width: "100%",
      minWidth: 300,
      maxWidth: 550
    }
  })
);

interface TemplatePreviewProps {
  templateFormValues: TemplateFormValues;
}

export const TemplatePreview: FunctionComponent<TemplatePreviewProps> = ({
  templateFormValues
}) => {
  const { t } = useTranslation();

  const fullName = templateFormValues.fullName || "John Doe";
  const email = templateFormValues.email || "john.doe@example-mail.com";
  const jobPosition = templateFormValues.jobPosition || "Software Engineer";
  const phoneNumber = templateFormValues.phoneNumber || "+48 777 777 777";

  const classes = useStyles();

  return (
    <>
      <Title>{t("scenes.TemplateFooter.previewTitle")}</Title>
      <Paper className={classes.paper}>
        {/* <button onClick={copyToClipboard}>copyToClipboard</button>
      <div id="clipboard-temp" ref={clipboardTemp}>
        {templateFooter}
      </div> */}
        <div
          dangerouslySetInnerHTML={{
            __html: getEmailTemplate({
              ...templateFormValues,
              fullName,
              email,
              jobPosition,
              phoneNumber
            })
          }}
        />
      </Paper>
    </>
  );
};

// const clipboardTemp = useRef() as MutableRefObject<HTMLInputElement>;

// const [templateFooter, setTemplateFooter] = useState("");

// function copyToClipboard() {
//   const footerTemplate = document.getElementById("footer-template");

//   if (!footerTemplate) {
//     return;
//   }

//   if (!clipboardTemp || !clipboardTemp.current) {
//     console.log("Please try again later");

//     return;
//   }

//   setTemplateFooter(footerTemplate.innerHTML);

//   const selection = window.getSelection();
//   const range = document.createRange();
//   range.selectNodeContents(clipboardTemp.current);

//   if (!selection) {
//     return;
//   }

//   selection.removeAllRanges();
//   selection.addRange(range);
//   document.execCommand("Copy");
//   alert("Copied div content to clipboard");
// }
