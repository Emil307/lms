import { useField } from "formik";
import React from "react";
import MultiSelect, { MultiSelectProps } from "./MultiSelect";

export interface FMultiSelectProps extends MultiSelectProps {
    name: string;
}

const FMultiSelect = ({ name, onChange = () => undefined, onBlur = () => undefined, ...props }: FMultiSelectProps) => {
    const [field, meta, helper] = useField(name);
    const error = React.useMemo(() => (meta.touched && meta.error) || null, [meta.error, meta.touched]);

    const handlerChange = (value: string[]) => {
        onChange(value);
        helper.setValue(value);
    };

    const handlerBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
        onBlur(e);
        field.onBlur(e);
    };

    return <MultiSelect {...props} onChange={handlerChange} onBlur={handlerBlur} value={field.value} name={field.name} error={error} />;
};

export default FMultiSelect;
