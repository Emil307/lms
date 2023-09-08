import React, { useMemo } from "react";
import { useField } from "formik";
import Input, { InputProps } from "./Input";

export interface FInputProps extends InputProps {
    name: string;
}

export default function FInput(props: FInputProps) {
    const [field, meta, helpers] = useField(props.name);

    const error = React.useMemo(() => (meta.touched && meta.error) || null, [meta.error, meta.touched]);
    const success = useMemo(() => meta.touched && props.success, [meta.touched, props.success]);

    const onChange = (value: string) => {
        helpers.setValue(value);
    };

    return (
        <Input {...props} onChange={onChange} onBlur={field.onBlur} value={field.value} name={field.name} error={error} success={success} />
    );
}
