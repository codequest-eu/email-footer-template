import * as yup from "yup";

import { reference } from "./utils";

export const todoReference = reference("todo");

export const todoResourceSchema = yup
  .object({
    attributes: yup
      .object({
        memo: yup.string().required(),
        isCompleted: yup.boolean().required()
      })
      .required()
  })
  .concat(todoReference)
  .required();

export type TodoResource = yup.InferType<typeof todoResourceSchema>;
