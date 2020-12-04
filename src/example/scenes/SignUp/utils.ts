import * as yup from "yup";

export const SignInValidationSchema = yup
  .object({
    email: yup
      .string()
      .email("validation.email")
      .required("validation.required"),
    password: yup.string().required("validation.required")
  })
  .required();

export type SignInFormValues = yup.InferType<typeof SignInValidationSchema>;
