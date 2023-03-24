import { useField } from "formik";
import React from "react";
import TextArea, { TextAreaProps } from "./TextArea";

export interface FTextAreaProps extends TextAreaProps {
    name: string;
}

const FTextArea = (props: FTextAreaProps) => {
    const [field, meta] = useField(props.name);
    const error = React.useMemo(() => (meta.touched && meta.error) || null, [meta.error, meta.touched]);
    return <TextArea {...props} name={props.name} value={field.value} onChange={field.onChange} error={error} />;
};

export default FTextArea;
