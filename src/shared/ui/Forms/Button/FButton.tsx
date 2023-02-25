import { useFormikContext } from "formik";
import React from "react";
import MemoizedButton, { ButtonProps } from "./Button";

export default function FButton(props: ButtonProps) {
    const ctx = useFormikContext<any>();

    return <MemoizedButton {...props} loading={ctx.isSubmitting} />;
}
