import { useField } from "formik";
import React, { useCallback } from "react";
import FileButton, { FileButtonProps } from "./FileButton";
import { UploadedFile } from "../FileInput";

export interface FFileButtonProps extends Omit<FileButtonProps, "name" | "onChange"> {
    name: string;
    onChange?: (payload: UploadedFile | null) => void;
}

export default function FFileButton({ name, onChange = () => undefined, ...props }: FFileButtonProps) {
    const [_field, _meta, helpers] = useField(name);

    const handleChange = useCallback((payload: UploadedFile | null) => {
        onChange(payload);
        helpers.setValue(payload);
    }, []);

    return <FileButton {...props} onChange={handleChange} />;
}
