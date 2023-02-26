import { QueryKey, useMutation, UseMutationOptions, useQuery } from "@tanstack/react-query";
import { FormikConfig, FormikValues } from "formik";
import React from "react";
import Form, { FormProps } from "./Form";

type ExtendedProps<T extends FormikValues = FormikValues> = Omit<FormProps<T>, "config">;

export interface ManagedFormProps<T extends FormikValues = FormikValues> extends ExtendedProps<T> {
    queryKey?: QueryKey;
    queryFn?: () => Promise<T> | T;
    mutation?: UseMutationOptions<T>;
    initialValues?: FormikConfig<T>["initialValues"];
}
//TODO: Закончить работу.
export default function ManagedForm<T extends FormikValues = FormikValues>({
    queryKey,
    queryFn = () => ({} as T),
    initialValues,
    children,
    ...form
}: ManagedFormProps<T>) {
    const { data, isLoading } = useQuery<T>({
        queryKey,
        queryFn,
        enabled: !!queryKey && !!queryFn,
    });

    const { isLoading: inProgress } = useMutation<T>({});

    const cfg: FormikConfig<T> = {
        onSubmit: console.warn,
        initialValues: data || initialValues || ({} as T),
    };

    return (
        <Form<T> {...form} config={cfg} isLoading={isLoading || inProgress}>
            {(formikProps) => (typeof children === "function" ? children(formikProps) : children)}
        </Form>
    );
}
