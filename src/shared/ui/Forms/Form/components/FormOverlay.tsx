import { LoadingOverlay } from "@mantine/core";
import { useFormikContext } from "formik";
import React from "react";
/**
 *  Оверлей формы вовремя загрузки. (formik.isSubmitting = true)
 */
export interface FormOverlayProps {
    isLoading: boolean;
}

export default function FormOverlay({ isLoading }: FormOverlayProps) {
    const ctx = useFormikContext<any>();
    return <LoadingOverlay visible={ctx.isSubmitting || isLoading} overlayBlur={2} />;
}
