import React, { ChangeEvent, ChangeEventHandler, useCallback } from "react";
import { useField } from "formik";
import Checkbox, { CheckboxProps } from "./Checkbox";

export interface FCheckboxProps extends CheckboxProps {
    name: string;
    onChange?: ChangeEventHandler<HTMLInputElement>;
}

export default function FProgressBar({ onChange = () => undefined, ...props }: FCheckboxProps) {
    const [field, _meta, helpers] = useField<boolean>(props.name);

    const handleChange = useCallback((newValue: ChangeEvent<HTMLInputElement>) => {
        onChange(newValue);
        helpers.setValue(newValue.target.checked);
    }, []);

    return <Checkbox {...props} checked={field.value} onChange={handleChange} />;
}
