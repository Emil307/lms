import React, { ChangeEvent, useCallback } from "react";
import { useField } from "formik";
import Switch, { SwitchProps } from "./Switch";

export interface FSwitchProps extends SwitchProps {
    name: string;
}

export default function FSwitch({ onChange = () => undefined, ...props }: FSwitchProps) {
    const [field, _meta, helpers] = useField<boolean>(props.name);

    const handleChange = useCallback((newValue: ChangeEvent<HTMLInputElement>) => {
        onChange(newValue);
        helpers.setValue(newValue.target.checked);
    }, []);

    return <Switch {...props} checked={field.value} onChange={handleChange} />;
}
