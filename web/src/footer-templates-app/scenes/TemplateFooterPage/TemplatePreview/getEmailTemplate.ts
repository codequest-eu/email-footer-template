import { TemplateFormValues } from "../types";

import { composeTemplate } from "./composeTemplate";

type GetEmailTemplate = TemplateFormValues;

export const getEmailTemplate = (templateData: GetEmailTemplate) => {
  return composeTemplate(templateData);
};
