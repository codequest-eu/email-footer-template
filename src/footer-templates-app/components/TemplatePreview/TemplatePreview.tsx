import { Paper } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React, { FunctionComponent } from "react";

import { TemplateFormValues } from "../../scenes/TemplateFooter/types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
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
  const {
    fullName = "Piotr Kawczyński",
    email = "piotr.kawczynski@codequest.com",
    jobPosition = "Software Engineer",
    phoneNumber = "+48 777 777 777",
    image: { url }
  } = templateFormValues;
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      {/* <button onClick={copyToClipboard}>copyToClipboard</button>
      <div id="clipboard-temp" ref={clipboardTemp}>
        {templateFooter}
      </div> */}
      {url}
      <div>
        <div>
          <link
            href="https://fonts.googleapis.com/css?family=Lato&display=swap"
            rel="stylesheet"
          />
        </div>
        <div id="footer-template">
          <table
            cellPadding="0"
            cellSpacing="0"
            style={{
              fontFamily: "Lato, Roboto, Helvetica, Tahoma, sans-serif"
            }}
          >
            <tbody>
              <tr>
                <td style={{ paddingRight: 30, width: 130 }}>
                  <img
                    src={url}
                    alt={fullName}
                    style={{ height: "auto", marginTop: 5, width: 130 }}
                  />
                </td>
                <td>
                  <div
                    style={{
                      color: "#ff5252",
                      fontSize: 20,
                      fontStretch: "normal",
                      fontStyle: "normal",
                      fontWeight: "bold",
                      letterSpacing: "normal",
                      lineHeight: "normal"
                    }}
                  >
                    {fullName}
                  </div>
                  <div
                    style={{
                      fontSize: 16,
                      fontStretch: "normal",
                      fontStyle: "normal",
                      letterSpacing: "normal",
                      lineHeight: "normal",
                      marginTop: 6
                    }}
                  >
                    {jobPosition}
                  </div>
                  <div style={{ fontSize: 14, marginTop: 6 }}>
                    <div style={{ marginBottom: 4, marginTop: 10 }}>
                      <b style={{ marginRight: 5 }}>e:</b> {email}
                    </div>
                    <div>
                      <b style={{ marginRight: 5 }}>m:</b>
                      {phoneNumber}
                    </div>
                  </div>

                  <div style={{ marginTop: 10 }}>
                    <a
                      href="https://www.linkedin.com/company/code-quest/"
                      style={{ textDecoration: "none !important" }}
                    >
                      <img
                        src="https://s3.eu-central-1.amazonaws.com/cq-email-footer/linked-in.jpg"
                        alt="LinkedIn"
                        style={{
                          border: 0,
                          height: 23,
                          marginRight: 5,
                          width: 23
                        }}
                      />
                    </a>
                    <a
                      href="https://www.facebook.com/codequest.eu/"
                      style={{ textDecoration: "none !important" }}
                    >
                      <img
                        src="https://s3.eu-central-1.amazonaws.com/cq-email-footer/fb.jpg"
                        alt={"Facebook"}
                        style={{
                          border: 0,
                          height: 23,
                          marginRight: 5,
                          width: 23
                        }}
                      />
                    </a>
                  </div>
                </td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <table
                    cellPadding="0"
                    cellSpacing="0"
                    style={{ marginTop: 35 }}
                  >
                    <tbody>
                      <tr>
                        <td className="logo">
                          <a
                            href="https://codequest.com?utm_source=email-footer"
                            style={{ textDecoration: "none !important" }}
                          >
                            <img
                              src="https://s3.eu-central-1.amazonaws.com/cq-email-footer/cq-logo.jpg"
                              alt="CodeQuest"
                              style={{
                                borderRight: "solid 2 #bababa",
                                marginTop: 8,
                                paddingRight: 25,
                                width: 168
                              }}
                            />
                          </a>
                        </td>
                        <td valign="middle">
                          <p
                            style={{
                              fontSize: 17,
                              fontWeight: 900,
                              overflow: "hidden",
                              paddingLeft: 20
                            }}
                          >
                            We turn ideas into{" "}
                            <span style={{ color: "#ff5252" }}>
                              awesome products
                            </span>
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <p
                    style={{
                      color: "#a7a7a7",
                      fontFamily: "Monaco, Courier New, Courier, monospace",
                      fontSize: 9,
                      maxWidth: 504,
                      textAlign: "justify"
                    }}
                  >
                    Your personal data related to this mail is processed by
                    codequest sp. z.o.o. with its registered office in Poland,
                    Warsaw, Zamiany 8 LU 202, 02-786, as Data Controller. The
                    data will be processed within the scope necessary for this
                    communication and corresponding purposes.
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Paper>
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
