import { FormikConfig, FormikProps, FormikValues } from "formik";
import React, { ReactNode } from "react";
import { Form } from "@shared/ui";

export type TFilterProps<F> = {
    formikConfig?: FormikConfig<F>;
    formRef?: React.RefObject<FormikProps<F>>;
    children?: ReactNode | ((props: FormikProps<F>) => ReactNode);
};

export default function Filter<F extends FormikValues>({ formikConfig, formRef, children }: TFilterProps<F>) {
    if (!formikConfig || !children) {
        return null;
    }

    return (
        <Form config={formikConfig} customRef={formRef}>
            {typeof children === "function" ? (formikContext) => children(formikContext) : children}
        </Form>
    );
}
