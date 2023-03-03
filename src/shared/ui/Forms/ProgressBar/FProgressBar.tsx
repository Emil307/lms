import React from "react";
import { useField } from "formik";
import ProgressBar, { ProgressBarProps } from "./ProgressBar";

export interface FProgressBarProps extends ProgressBarProps {
    name: string;
}

export default function FProgressBar<T extends number = number>(props: FProgressBarProps) {
    const [field] = useField<T>(props.name);

    return <ProgressBar {...props} value={field.value} />;
}
