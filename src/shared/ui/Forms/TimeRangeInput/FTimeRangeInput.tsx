import React, { useCallback, useMemo } from "react";
import { useField } from "formik";
import TimeRangeInput, { TimeRangeInputProps } from "./TimeRangeInput";

export interface FTimeRangeInputProps extends TimeRangeInputProps {
    name: string;
    nameTo: string;
}

export default function FDatePicker({ onChange = () => undefined, ...props }: FTimeRangeInputProps) {
    const [field, meta, helpers] = useField<string | null>(props.name);
    const [fieldTo, _metaTo, helpersTo] = useField<string | null>(props.nameTo);

    const handleChange = useCallback((newValue: [string | null, string | null]) => {
        onChange(newValue);
        helpers.setValue(newValue[0]);
        helpersTo.setValue(newValue[1]);
    }, []);

    const error = React.useMemo(() => (meta.touched && meta.error) || null, [meta.error, meta.touched]);

    const value: [string | null, string | null] = useMemo(() => [field.value, fieldTo.value], [field.value, fieldTo.value]);

    return <TimeRangeInput {...props} value={value} onChange={handleChange} error={error} />;
}
