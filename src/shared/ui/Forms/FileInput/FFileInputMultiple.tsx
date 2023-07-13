import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useField } from "formik";
import { UploadedFile } from "@shared/types";
import FileInput, { FileInputProps } from "./FileInput";

export interface FFileInputMultipleProps extends Omit<FileInputProps, "onUploaded"> {
    name: string;
    onLoad?: (file: UploadedFile) => void;
}

export default function FFileInputMultiple({
    name,
    onLoad = () => undefined,
    onDeleteLoadedFile = () => undefined,
    ...props
}: FFileInputMultipleProps) {
    const [field, meta, helpers] = useField<UploadedFile[]>(name);
    const [files, setFiles] = useState<UploadedFile[]>(field.value);

    const error = useMemo(() => (meta.touched && meta.error) || undefined, [meta.error, meta.touched]);

    useEffect(() => {
        helpers.setValue(files);
    }, [files]);

    const handleUploadedFile = (file: UploadedFile) => {
        onLoad(file);
        setFiles((state) => [...state, file]);
    };

    const handleDeleteLoadedFile = useCallback(
        (fileForDeleting: UploadedFile) => {
            onDeleteLoadedFile(fileForDeleting);
            setFiles((state) => state.filter((file) => file.id !== fileForDeleting.id));
        },
        [field.value]
    );

    return (
        <FileInput
            {...props}
            loadedFilesData={field.value}
            onUploaded={handleUploadedFile}
            onDeleteLoadedFile={handleDeleteLoadedFile}
            error={error}
            multiple
        />
    );
}
