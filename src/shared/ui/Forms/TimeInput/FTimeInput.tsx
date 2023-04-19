import React, { useCallback } from "react";
import { useField } from "formik";
import TimeInput, { TimeInputProps } from "./TimeInput";

export interface FTimeInputProps extends TimeInputProps {
    name: string;
}

export default function FTimeInput({ onChange = () => undefined, ...props }: FTimeInputProps) {
    const [field, meta, helpers] = useField<Date | null>(props.name);

    const handleChange = useCallback((newValue: Date) => {
        onChange(newValue);
        helpers.setValue(newValue);
    }, []);

    const error = (meta.touched && meta.error) || null;

    return <TimeInput {...props} value={field.value} onChange={handleChange} error={error} />;
}
