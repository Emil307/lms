import { useField } from "formik";
import React from "react";
import Textarea, { TextareaProps } from "./Textarea";

export interface FTextareaProps extends TextareaProps {
    name: string;
}

const FTextarea = (props: FTextareaProps) => {
    const [field, meta] = useField(props.name);
    const error = (meta.touched && meta.error) || null;

    return <Textarea {...props} name={props.name} value={field.value} onChange={field.onChange} error={error} />;
};

export default FTextarea;
