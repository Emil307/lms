import { useField } from "formik";
import React from "react";
import MultiSelect, { MultiSelectProps } from "./MultiSelect";

export interface FMultiSelectProps extends MultiSelectProps {
    name: string;
}

const FMultiSelect = ({ name, ...props }: FMultiSelectProps) => {
    const [field, meta, helper] = useField(name);
    const error = React.useMemo(() => (meta.touched && meta.error) || null, [meta.error, meta.touched]);
    return <MultiSelect {...props} onChange={helper.setValue} onBlur={field.onBlur} value={field.value} name={field.name} error={error} />;
};

export default FMultiSelect;
