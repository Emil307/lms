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

    //При одновременной загрузке нескольких файлов необходимо получать предыдущий стейт массива загруженных файлов
    const [files, setFiles] = useState<UploadedFile[]>(field.value);

    const error = useMemo(() => (meta.touched && meta.error) || undefined, [meta.error, meta.touched]);

    //При одновременной загрузке нескольких файлов необходимо получать предыдущий стейт массива загруженных файлов
    useEffect(() => {
        helpers.setValue(files);
    }, [files]);

    //Для resetForm
    useEffect(() => {
        if (!field.value.length && files.length) {
            setFiles([]);
        }
    }, [field.value]);

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
