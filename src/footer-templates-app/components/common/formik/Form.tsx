import { Formik, FormikConfig, Form as FormikForm, FormikValues } from "formik";
import noop from "lodash/noop";
import React from "react";
import * as yup from "yup";

interface Props<Values extends UnknownRecord = FormikValues> {
  validationSchema: yup.ObjectSchema<Values>;
  children: FormikConfig<Values>["children"];
  onSubmit?: FormikConfig<Values>["onSubmit"];
  initialValues: FormikConfig<Values>["initialValues"];
}

export const Form = <Values extends UnknownRecord>({
  onSubmit,
  validationSchema,
  children,
  ...formikProps
}: Props<Values>) => {
  const handleSubmit: NonNullable<Props<Values>["onSubmit"]> = onSubmit
    ? (rawValues, actions) => {
        const values = validationSchema.cast(rawValues);
        void onSubmit(values, actions);
      }
    : noop;

  return (
    <Formik
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      {...formikProps}
    >
      {(props) => (
        <FormikForm translate="yes">
          {typeof children === "function" ? children(props) : children}
        </FormikForm>
      )}
    </Formik>
  );
};
