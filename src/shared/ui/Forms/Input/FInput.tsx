import React, { useMemo } from "react";
import { useField } from "formik";
import Input, { InputProps } from "./Input";

export interface FInputProps extends InputProps {
    name: string;
}

export default function FInput<T extends string = string>(props: FInputProps) {
    const [field, meta] = useField<T>(props.name);

    const error = React.useMemo(() => (meta.touched && meta.error) || null, [meta.error, meta.touched]);
    const success = useMemo(() => meta.touched && props.success, [meta.touched, props.success]);

    return (
        <Input
            {...props}
            onChange={field.onChange}
            onBlur={field.onBlur}
            value={field.value}
            name={field.name}
            error={error}
            success={success}
        />
    );
}
