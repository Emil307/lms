import React from "react";
import { Formik, FormikConfig, FormikValues } from "formik";
import BaseForm, { BaseFormProps } from "./BaseForm";
import FormPersister from "./FormPersister";
import FormOverlay from "./FormOverlay";

export interface FormProps<T extends FormikValues = FormikValues> {
    config: FormikConfig<T>;
    form?: BaseFormProps;
    children?: React.ComponentProps<typeof Formik<T>>["children"];
    persist?: boolean;
}

function Form<T extends FormikValues = FormikValues>({ config, children, form, persist = false }: FormProps<T>) {
    return (
        <Formik<T> {...config}>
            {(formikProps) => (
                <FormPersister initialValues={config.initialValues} enabled={persist}>
                    <BaseForm {...form}>
                        <FormOverlay />
                        {typeof children === "function" ? children(formikProps) : children}
                    </BaseForm>
                </FormPersister>
            )}
        </Formik>
    );
}
export default Form;
