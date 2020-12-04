import * as yup from "yup";

import { reference } from "./utils";

export const userReference = reference("user");

export const userResourceSchema = yup
  .object({
    attributes: yup
      .object({
        firstName: yup.string().required(),
        lastName: yup.string().required()
      })
      .required()
  })
  .concat(userReference)
  .required();

export type UserResource = yup.InferType<typeof userResourceSchema>;
