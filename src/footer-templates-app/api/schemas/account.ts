import * as yup from "yup";

import { reference } from "./utils";

export const accountReference = reference("account");

export const accountResourceSchema = yup
  .object({
    attributes: yup
      .object({
        email: yup.string().required()
      })
      .required()
  })
  .concat(accountReference)
  .required();

export type AccountResource = yup.InferType<typeof accountResourceSchema>;
