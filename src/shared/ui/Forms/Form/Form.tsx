import React, { Ref, useMemo } from "react";
import { Formik, FormikConfig, FormikProps, FormikValues } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { BaseForm, BaseFormProps } from "./BaseForm";
import FormPersister from "./components/FormPersister";
import FormOverlay from "./components/FormOverlay";
import { FormSubmittingContext } from "./constants";

export interface FormProps<T extends FormikValues = FormikValues> {
    config: FormikConfig<T>;
    disableOverlay?: boolean;
    form?: Omit<BaseFormProps, "onSubmit">;
    children?: React.ComponentProps<typeof Formik<T>>["children"];
    isLoading?: boolean;
    customRef?: Ref<FormikProps<T>>;
    onSubmit?: (formikValues: FormikProps<T>["values"]) => void;
    //TODO: Улучшить работу persist:
    // Добавить параметры указания как именно сохранять,
    // добавить возможность исключать поля (например пароль из persist'a), добавить возможность указания времени debounce.
    persist?: boolean;
}

function Form<T extends FormikValues = FormikValues>({
    config,
    children,
    form,
    customRef,
    onSubmit = () => undefined,
    persist = false,
    disableOverlay = false,
    isLoading = false,
}: FormProps<T>) {
    const onSubmitForm: FormikConfig<T>["onSubmit"] = React.useCallback(
        (values, helpers) => {
            config.onSubmit(values, helpers);
            onSubmit(values);
            helpers.setSubmitting(false);
        },
        [config.onSubmit]
    );
    const validationSchema = useMemo(
        () => (config.validationSchema ? toFormikValidationSchema(config.validationSchema) : null),
        [config.validationSchema]
    );

    return (
        <Formik<T> {...config} validationSchema={validationSchema} onSubmit={onSubmitForm} innerRef={customRef}>
            {(formikProps) => (
                <FormPersister initialValues={config.initialValues} enabled={persist}>
                    <BaseForm {...form}>
                        {!disableOverlay && <FormOverlay isLoading={isLoading} />}
                        <FormSubmittingContext.Provider value={isLoading}>
                            {typeof children === "function" ? children(formikProps) : children}
                        </FormSubmittingContext.Provider>
                    </BaseForm>
                </FormPersister>
            )}
        </Formik>
    );
}
export default Form;
