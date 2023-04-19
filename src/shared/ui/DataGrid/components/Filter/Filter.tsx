import { FormikConfig, FormikHelpers, FormikProps, FormikValues } from "formik";
import React, { ReactNode, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { Form } from "@shared/ui";
import { TFilterTable } from "../../types";

export type TFilterProps<F> = {
    filter?: TFilterTable<F>;
    filterParams: Partial<F>;
    children?: ReactNode | ((props: FormikProps<F>) => ReactNode);
};

export default function Filter<F extends FormikValues>({ filter, filterParams, children }: TFilterProps<F>) {
    const router = useRouter();
    const formRef = useRef<FormikProps<F>>(null);

    useEffect(() => {
        if (!router.isReady || !formRef.current) {
            return;
        }
        formRef.current.setValues(getFilterValuesFromParams());
    }, [router.isReady, formRef.current]);

    if (!filter || !children) {
        return null;
    }

    const getFilterValuesFromParams = () => {
        const initialValues = { ...filter.initialValues };
        for (const key in filter.initialValues) {
            initialValues[key] = filterParams[key] ?? filter.initialValues[key];
        }
        return initialValues;
    };

    const handleSubmit = async (values: F, helpers: FormikHelpers<F>) => {
        if (!formRef.current || !formRef.current.dirty) {
            return;
        }
        router.push(
            {
                pathname: router.pathname,
                query: { ...router.query, ...values, page: "1" },
            },
            undefined,
            { shallow: true }
        );
        helpers.resetForm({ values });
    };

    const formikConfig: FormikConfig<F> = {
        initialValues: filter.initialValues,
        validationSchema: filter.validationSchema,
        onSubmit: handleSubmit,
    };

    return (
        <Form config={formikConfig} customRef={formRef}>
            {typeof children === "function" ? (formikContext) => children(formikContext) : children}
        </Form>
    );
}
