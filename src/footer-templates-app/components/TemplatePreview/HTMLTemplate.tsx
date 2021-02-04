import React, { FunctionComponent } from "react";

interface TemplateOptions {
  fullName: string;
  image: string;
  jobPosition: string;
  email: string;
  phoneNumber?: string;
}

export const HTMLTemplate: FunctionComponent = () => {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: composeHtmlTemplate({
          fullName: "Piotr Kawczyński",
          image: "",
          email: "piotr.kawczynski@codequest.com",
          jobPosition: "Software Engineer",
          phoneNumber: "+48 777 777 777"
        })
      }}
    />
  );
};

function composeHtmlTemplate({
  fullName,
  image,
  email,
  jobPosition,
  phoneNumber
}: TemplateOptions) {
  const phoneNumberSection = phoneNumber
    ? `<div><b style="margin-right: 5px;">m:</b> ${phoneNumber}</div>`
    : "";

  return `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <link href="https://fonts.googleapis.com/css?family=Lato&display=swap" rel="stylesheet">
  </head>
  <body>

  <table cellpadding="0" cellspacing="0" border="0" style="font-family: 'Lato', 'Roboto', Helvetica, Tahoma, sans-serif;">
      <tr>
          <td style="padding-right: 30px; width: 130px;">
              <img src="${image}" alt="${fullName}" style="height: auto; margin-top: 5px; width: 130px;">
          </td>
          <td>
              <!-- Person -->
              <div style="color: #ff5252; font-size: 20px; font-stretch: normal; font-style: normal; font-weight: bold; letter-spacing: normal; line-height: normal;">${fullName}</div>
              <div style="font-size: 16px; font-stretch: normal; font-style: normal; letter-spacing: normal; line-height: normal; margin-top: 6px;">${jobPosition}</div>
              <div style="font-size: 14px; margin-top: 6px;">

                  <!-- E-mail -->
                  <div style="margin-bottom: 4px; margin-top: 10px;">
                      <b style="margin-right: 5px;">e:</b> ${email}
                  </div>

                  <!-- Phone -->
                  ${phoneNumberSection}
              </div>

              <!-- Social media -->
              <div style="margin-top: 10px;">
                  <a href="https://www.linkedin.com/company/code-quest/" style="text-decoration: none !important;">
                      <img src="https://s3.eu-central-1.amazonaws.com/cq-email-footer/linked-in.jpg" border="0" alt="LinkedIn" style="border: 0; height: 23px; margin-right: 5px; width: 23px;">
                  </a>
                  <a href="https://www.facebook.com/codequest.eu/" style="text-decoration: none !important;">
                      <img src="https://s3.eu-central-1.amazonaws.com/cq-email-footer/fb.jpg" border="0" alt="Facebook" style="border: 0; height: 23px; margin-right: 5px; width: 23px;">
                  </a>
              </div>
          </td>
      </tr>
      <tr>
          <td colspan="2">
              <!-- Logo -->
              <table cellpadding="0" cellspacing="0" border="0" style="margin-top: 35px;">
                  <tr>
                      <td class="logo">
                          <a href="https://codequest.com?utm_source=email-footer" style="text-decoration: none !important;">
                              <img src="https://s3.eu-central-1.amazonaws.com/cq-email-footer/cq-logo.jpg" alt="CodeQuest" style="border-right: solid 2px #bababa; margin-top: 8px; padding-right: 25px; width: 168px;">
                          </a>
                      </td>
                      <td valign="middle">
                          <p style="font-size: 17px; font-weight: 900; overflow: hidden; padding-left: 20px;">
                              We turn ideas into <span style="color: #ff5252;">awesome products</span>
                          </p>
                      </td>
                  </tr>
              </table>
          </td>
      </tr>
      <tr>
          <td colspan="2">
              <p style="color: #a7a7a7; font-family: 'Monaco', 'Courier New', Courier, monospace; font-size: 9px; max-width: 504px; text-align: justify;">
                  Your personal data related to this mail is processed by codequest sp. z.o.o. with its
                  registered office in Poland, Warsaw, Zamiany 8 LU 202, 02-786, as Data Controller.
                  The data will be processed within the scope necessary for this communication and
                  corresponding purposes.
              </p>
          </td>
      </tr>
  </table>

  </body>
  </html>`;
}
