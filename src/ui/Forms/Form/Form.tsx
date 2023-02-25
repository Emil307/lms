import React from "react";
import { Formik, FormikConfig, FormikValues } from "formik";
import BaseForm, { BaseFormProps } from "./BaseForm";
import FormPersister from "./components/FormPersister";
import FormOverlay from "./components/FormOverlay";

export interface FormProps<T extends FormikValues = FormikValues> {
    config: FormikConfig<T>;
    form?: BaseFormProps;
    children?: React.ComponentProps<typeof Formik<T>>["children"];
    isLoading?: boolean;
    //TODO: Улучшить работу persist:
    // Добавить параметры указания как именно сохранять,
    // добавить возможность исключать поля (например пароль из persist'a), добавить возможность указания времени debounce.
    persist?: boolean;
}

function Form<T extends FormikValues = FormikValues>({ config, children, form, persist = false, isLoading = false }: FormProps<T>) {
    return (
        <Formik<T> {...config}>
            {(formikProps) => (
                <FormPersister initialValues={config.initialValues} enabled={persist}>
                    <BaseForm {...form}>
                        <FormOverlay isLoading={isLoading} />
                        {typeof children === "function" ? children(formikProps) : children}
                    </BaseForm>
                </FormPersister>
            )}
        </Formik>
    );
}
export default Form;
