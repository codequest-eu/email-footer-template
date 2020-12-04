import * as yup from "yup";

import { accountReference } from "./account";
import { userReference } from "./user";
import { reference, singleRelationship } from "./utils";

export const sessionReference = reference("session");

export const sessionResourceSchema = yup
  .object({
    attributes: yup.object({}).required(),
    relationships: yup
      .object({
        user: singleRelationship(userReference).required(),
        account: singleRelationship(accountReference).required()
      })
      .required()
  })
  .concat(sessionReference)
  .required();

export type SessionResource = yup.InferType<typeof sessionResourceSchema>;
