import * as yup from "yup";

import { jsonapi } from "./api";
import { todoResourceSchema } from "./schemas/todo";

export async function getManyTodos() {
  return jsonapi.getMany({
    path: "todos",
    responseSchema: yup
      .object({
        data: yup.array().of(todoResourceSchema).defined()
      })
      .required()
  });
}
