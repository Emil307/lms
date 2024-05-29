import { FormikConfig, FormikProps, FormikValues } from "formik";
import React, { ReactNode } from "react";
import { CollapsedFiltersBlock, CollapsedFiltersBlockProps } from "@shared/ui";

export type TFilterProps<F extends FormikValues> = {
    formikConfig?: FormikConfig<F>;
    formRef?: React.RefObject<FormikProps<F>>;
    children?: ReactNode | ((props: FormikProps<F>) => ReactNode);
    collapsedFiltersBlockProps?: Pick<
        CollapsedFiltersBlockProps<F>,
        "titleOpened" | "titleClosed" | "isCollapsed" | "leftIcon" | "queryParams"
    >;
};

export default function Filter<F extends FormikValues>({ formikConfig, formRef, children, collapsedFiltersBlockProps }: TFilterProps<F>) {
    if (!formikConfig || !children) {
        return null;
    }

    return (
        <CollapsedFiltersBlock
            formProps={{
                config: formikConfig,
                customRef: formRef,
                disableOverlay: true,
            }}
            {...collapsedFiltersBlockProps}
            mb={32}>
            {children}
        </CollapsedFiltersBlock>
    );
}
