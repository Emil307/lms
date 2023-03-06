import { useField } from "formik";
import React from "react";
import { RadioGroup, RadioGroupProps } from "./RadioGroup";

export interface FRadioGroupProps extends RadioGroupProps {
    name: string;
}

export const FRadioGroup = ({ name, onChange = () => undefined, ...props }: FRadioGroupProps) => {
    const [field, meta, helpers] = useField(name);

    const handlerChange = (value: string) => {
        onChange(value);
        helpers.setValue(value);
    };

    const error = React.useMemo(() => (meta.touched && meta.error) || null, [meta.error, meta.touched]);

    return <RadioGroup {...props} onChange={handlerChange} name={name} value={field.value} error={error} />;
};
