import { useField } from "formik";
import React from "react";
import { CheckboxGroupProps } from "./CheckboxGroup";
import CheckboxGroup from "./CheckboxGroup";

export interface FCheckboxGroupProps extends CheckboxGroupProps {
    name: string;
}
const FCheckboxGroup = ({ name, onChange = () => undefined, ...props }: FCheckboxGroupProps) => {
    const [field, meta, helpers] = useField(name);

    const handleChange = (value: string[]) => {
        onChange(value);
        helpers.setValue(value);
    };

    const error = (meta.touched && meta.error) || null;

    return <CheckboxGroup {...props} onChange={handleChange} value={field.value} error={error} />;
};

export default FCheckboxGroup;
