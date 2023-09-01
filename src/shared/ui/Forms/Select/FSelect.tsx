import React, { useCallback } from "react";
import { useField } from "formik";
import Select, { SelectProps } from "./Select";

export interface FSelectProps extends SelectProps {
    name: string;
}

const FSelect = ({ onChange, ...props }: FSelectProps) => {
    const [field, meta, helper] = useField(props.name);
    const error = React.useMemo(() => (meta.touched && meta.error) || null, [meta.error, meta.touched]);

    const handleChange = useCallback((value: string | null) => {
        helper.setValue(value);
        onChange?.(value);
    }, []);

    return <Select {...props} onChange={handleChange} onBlur={field.onBlur} value={field.value} name={field.name} error={error} />;
};

export default FSelect;
