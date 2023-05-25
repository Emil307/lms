import React, { useCallback } from "react";
import { useField } from "formik";
import DateRangePicker, { DateRangePickerProps } from "./DateRangePicker";

export interface FDateRangePickerProps extends DateRangePickerProps {
    name: string;
    nameTo: string;
}

const FDateRangePicker = ({ onChange = () => undefined, ...props }: FDateRangePickerProps) => {
    const [field, meta, helpers] = useField(props.name);
    const [fieldTo, _metaTo, helpersTo] = useField(props.nameTo);

    const handleChange = useCallback((newValue: [Date | null, Date | null]) => {
        onChange(newValue);
        helpers.setValue(newValue[0]);
        helpersTo.setValue(newValue[1]);
    }, []);

    const error = (meta.touched && meta.error) || null;

    return <DateRangePicker {...props} value={[field.value, fieldTo.value]} onChange={handleChange} onBlur={field.onBlur} error={error} />;
};

export default FDateRangePicker;
