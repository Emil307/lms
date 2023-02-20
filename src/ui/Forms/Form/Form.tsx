import React from "react";
import { Formik, FormikConfig, FormikValues } from "formik";
import BaseForm, { BaseFormProps } from "./BaseForm";
import FormPersister from "./FormPersister";
import FormOverlay from "./FormOverlay";

export interface FormProps<T extends FormikValues = FormikValues> {
    config: FormikConfig<T>;
    disableOverlay?: boolean;
    form?: Omit<BaseFormProps, "onSubmit">;
    children?: React.ComponentProps<typeof Formik<T>>["children"];
    persist?: boolean;
}

function Form<T extends FormikValues = FormikValues>({ config, children, form, persist = false, disableOverlay = false }: FormProps<T>) {
    const onSubmit: FormikConfig<T>["onSubmit"] = React.useCallback(
        (values, helpers) => {
            Promise.resolve(config.onSubmit(values, helpers)).finally(() => helpers.setSubmitting(false));
        },
        [config.onSubmit]
    );

    return (
        <Formik<T> {...config} onSubmit={onSubmit}>
            {(formikProps) => (
                <FormPersister initialValues={config.initialValues} enabled={persist}>
                    <BaseForm {...form}>
                        {!disableOverlay && <FormOverlay />}
                        {typeof children === "function" ? children(formikProps) : children}
                    </BaseForm>
                </FormPersister>
            )}
        </Formik>
    );
}
export default Form;
