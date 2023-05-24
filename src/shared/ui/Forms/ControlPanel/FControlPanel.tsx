import React, { ChangeEvent, useCallback } from "react";
import { useField } from "formik";
import ControlPanel, { ControlPanelProps } from "./ControlPanel";

export interface FControlPanelProps extends ControlPanelProps {
    name: string;
}

export default function FControlPanel({ onChange = () => undefined, ...props }: FControlPanelProps) {
    const [field, _meta, helpers] = useField<boolean>(props.name);

    const handleChange = useCallback((newValue: ChangeEvent<HTMLInputElement>) => {
        onChange(newValue);
        helpers.setValue(newValue.target.checked);
    }, []);

    return <ControlPanel {...props} checked={field.value} onChange={handleChange} />;
}
