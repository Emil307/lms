import { useField } from "formik";
import React, { useCallback } from "react";
import { UploadedFile } from "@shared/types";
import AvatarInput, { AvatarInputProps } from "./AvatarInput";

export interface FAvatarInputProps extends Omit<AvatarInputProps, "name" | "onChange"> {
    name: string;
    onChange?: (payload: UploadedFile | null) => void;
}

export default function FAvatarInput({ name, onChange = () => undefined, ...props }: FAvatarInputProps) {
    const [field, meta, helpers] = useField<UploadedFile | null>(name);

    const error = (meta.touched && meta.error) || undefined;

    const handleChange = useCallback((payload: UploadedFile | null) => {
        onChange(payload);
        helpers.setValue(payload);
    }, []);

    return <AvatarInput {...props} value={field.value} onChange={handleChange} error={error} />;
}
