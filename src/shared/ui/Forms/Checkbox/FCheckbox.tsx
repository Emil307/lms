import React, { ChangeEvent, ChangeEventHandler, useCallback } from "react";
import { useField } from "formik";
import Checkbox, { CheckboxProps } from "./Checkbox";

export interface FCheckboxProps extends CheckboxProps {
    name: string;
    onChange?: ChangeEventHandler<HTMLInputElement>;
}

export default function FCheckbox({ onChange = () => undefined, ...props }: FCheckboxProps) {
    const [field, meta, helpers] = useField<boolean>(props.name);

    const error = React.useMemo(() => (meta.touched && meta.error) || null, [meta.error, meta.touched]);

    const handleChange = useCallback((newValue: ChangeEvent<HTMLInputElement>) => {
        onChange(newValue);
        helpers.setValue(newValue.target.checked);
    }, []);

    return <Checkbox {...props} checked={field.value} onChange={handleChange} error={error} />;
}
