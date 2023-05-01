import { useMutation } from "@tanstack/react-query";
import { FormikConfig, FormikValues } from "formik";
import React from "react";
import Form, { FormProps } from "./Form";
import axios from "axios";

type ExtendedProps<F extends FormikValues = FormikValues> = Omit<FormProps<F>, "config">;

export interface ManagedFormProps<F extends FormikValues, R extends Record<string, any>> extends ExtendedProps<F> {
    mutationKey: string;
    mutationFunction: (params: F) => Promise<R>;
    onSuccess: (response: R) => void;
    onError?: (error: unknown) => void;
    initialValues: FormikConfig<F>["initialValues"];
    validationSchema?: FormikConfig<F>["validationSchema"];
}

export default function ManagedForm<F extends FormikValues, R extends Record<string, any>>({
    mutationKey,
    mutationFunction,
    onSuccess,
    onError = () => undefined,
    initialValues,
    validationSchema,
    children,
    ...form
}: ManagedFormProps<F, R>) {
    const { isLoading, mutate } = useMutation<R, unknown, F>([mutationKey], { mutationFn: mutationFunction });

    const cfg: FormikConfig<F> = {
        initialValues,
        validationSchema,
        enableReinitialize: true,
        onSubmit: (values, { setFieldError }) => {
            mutate(values, {
                onSuccess: (response) => onSuccess(response),
                onError: (error) => {
                    if (axios.isAxiosError(error)) {
                        for (const errorField in error.response?.data.errors) {
                            setFieldError(errorField, error.response?.data.errors[errorField][0]);
                        }
                    }
                    onError(error);
                },
            })
        }
    };

    return (
        <Form {...form} config={cfg} isLoading={isLoading}>
            {(formikProps) => (typeof children === "function" ? children(formikProps) : children)}
        </Form>
    );
}
