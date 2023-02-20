import { LoadingOverlay } from "@mantine/core";
import { useFormikContext } from "formik";
import React from "react";

export default function FormOverlay() {
    const ctx = useFormikContext<any>();
    return <LoadingOverlay visible={ctx.isSubmitting} overlayBlur={2} />;
}
