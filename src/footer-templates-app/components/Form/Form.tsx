/* eslint-disable no-console */
import { Formik, FormikConfig, Form as FormikForm, FormikValues } from "formik";
import React, { FunctionComponent } from "react";
import * as Yup from "yup";

interface Props<Values extends UnknownRecord = FormikValues> {
  initialValues: Values;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validationSchema: Yup.ObjectSchema<any>;
  onSubmit: FormikConfig<Values>["onSubmit"];
  validateOnBlur: FormikConfig<Values>["validateOnBlur"];
  validateOnChange: FormikConfig<Values>["validateOnChange"];
}

export const Form: FunctionComponent<Props> = ({
  children,
  validationSchema,
  ...formikProps
}) => {
  return (
    <Formik {...formikProps} validationSchema={validationSchema}>
      {(props) => (
        <FormikForm translate="yes">
          {children && typeof children === "function"
            ? children(props)
            : children}
        </FormikForm>
      )}
    </Formik>
  );
};
