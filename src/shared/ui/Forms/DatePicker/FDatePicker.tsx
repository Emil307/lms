import React, { useCallback } from "react";
import { useField } from "formik";
import DatePicker, { DatePickerProps } from "./DatePicker";

export interface FDatePickerProps extends DatePickerProps {
    name: string;
}

export default function FDatePicker({ onChange = () => undefined, ...props }: FDatePickerProps) {
    const [field, meta, helpers] = useField(props.name);

    const handleChange = useCallback((newValue: Date | null) => {
        onChange(newValue);
        helpers.setValue(newValue);
    }, []);

    const error = React.useMemo(() => (meta.touched && meta.error) || null, [meta.error, meta.touched]);

    return <DatePicker {...props} value={field.value} onChange={handleChange} error={error} />;
}
