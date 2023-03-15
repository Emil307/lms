import React from "react";
import { Formik, FormikConfig, FormikValues } from "formik";
import BaseForm, { BaseFormProps } from "./BaseForm";
import FormPersister from "./components/FormPersister";
import FormOverlay from "./components/FormOverlay";
import { toFormikValidationSchema } from "zod-formik-adapter";

export interface FormProps<T extends FormikValues = FormikValues> {
    config: FormikConfig<T>;
    disableOverlay?: boolean;
    form?: Omit<BaseFormProps, "onSubmit">;
    children?: React.ComponentProps<typeof Formik<T>>["children"];
    isLoading?: boolean;
    //TODO: Улучшить работу persist:
    // Добавить параметры указания как именно сохранять,
    // добавить возможность исключать поля (например пароль из persist'a), добавить возможность указания времени debounce.
    persist?: boolean;
}

function Form<T extends FormikValues = FormikValues>({
    config,
    children,
    form,
    persist = false,
    disableOverlay = false,
    isLoading = false,
}: FormProps<T>) {
    const onSubmit: FormikConfig<T>["onSubmit"] = React.useCallback(
        (values, helpers) => {
            Promise.resolve(config.onSubmit(values, helpers)).finally(() => helpers.setSubmitting(false));
        },
        [config.onSubmit]
    );

    return (
        <Formik<T> {...config} validationSchema={toFormikValidationSchema(config.validationSchema)} onSubmit={onSubmit}>
            {(formikProps) => (
                <FormPersister initialValues={config.initialValues} enabled={persist}>
                    <BaseForm {...form}>
                        {!disableOverlay && <FormOverlay isLoading={isLoading} />}
                        {typeof children === "function" ? children(formikProps) : children}
                    </BaseForm>
                </FormPersister>
            )}
        </Formik>
    );
}
export default Form;
