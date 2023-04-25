import React, { useCallback } from "react";
import { useField } from "formik";
import TextEditor, { TextEditorProps } from "./TextEditor";

export interface FTextEditorProps extends TextEditorProps {
    name: string;
}

const FTextEditor = ({ name, ...props }: FTextEditorProps) => {
    const [field, meta, helpers] = useField(name);

    const handleChange = useCallback((value: string) => helpers.setValue(value), []);

    const error = (meta.touched && meta.error) || null;

    return <TextEditor {...props} value={field.value} setValue={handleChange} error={error} />;
};

export default FTextEditor;
