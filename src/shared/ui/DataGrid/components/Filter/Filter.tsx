import { FormikConfig, FormikProps, FormikValues } from "formik";
import React, { ReactNode } from "react";
import { CollapsedFiltersBlock, CollapsedFiltersBlockProps, Form } from "@shared/ui";

export type TFilterProps<F> = {
    formikConfig?: FormikConfig<F>;
    formRef?: React.RefObject<FormikProps<F>>;
    children?: ReactNode | ((props: FormikProps<F>) => ReactNode);
    collapsedFiltersBlockProps?: CollapsedFiltersBlockProps<F>;
};

export default function Filter<F extends FormikValues>({ formikConfig, formRef, collapsedFiltersBlockProps, children }: TFilterProps<F>) {
    if (!formikConfig || !children) {
        return null;
    }

    return (
        <CollapsedFiltersBlock mb={32} {...collapsedFiltersBlockProps}>
            <Form config={formikConfig} customRef={formRef}>
                {typeof children === "function" ? (formikContext) => children(formikContext) : children}
            </Form>
        </CollapsedFiltersBlock>
    );
}
