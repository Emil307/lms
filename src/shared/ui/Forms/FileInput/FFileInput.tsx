import { useField } from "formik";
import React, { useMemo } from "react";
import { UploadedFile } from "@shared/types";
import FileInput, { FileInputProps } from "./FileInput";

export interface FFileInputProps extends Omit<FileInputProps, "onError" | "file" | "fileName" | "fileSize" | "fileUrl" | "onUploaded"> {
    name: string;
    onLoad?: (file: UploadedFile) => void;
}

export default function FFileInput({ name, onLoad = () => undefined, onDeleteLoadedFile = () => undefined, ...props }: FFileInputProps) {
    const [field, meta, helpers] = useField<UploadedFile | null>(name);
    const error = useMemo(() => (meta.touched && meta.error) || undefined, [meta.error, meta.touched]);

    const handleUploadedFile = (file: UploadedFile) => {
        onLoad(file);
        helpers.setValue(file);
    };

    const handleDeleteLoadedFile = (file: UploadedFile) => {
        onDeleteLoadedFile(file);
        helpers.setValue(null);
    };

    const loadedFilesData = field.value ? [field.value] : [];

    return (
        <FileInput
            {...props}
            loadedFilesData={loadedFilesData}
            onUploaded={handleUploadedFile}
            onDeleteLoadedFile={handleDeleteLoadedFile}
            error={error}
        />
    );
}
