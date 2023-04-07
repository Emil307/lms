import { useField } from "formik";
import React, { useEffect, useMemo, useState } from "react";
import FileInput, { FileInputProps } from "./FileInput";
import { InitialFile, isFile, UploadedFile } from "./utils";

export interface FFileInputProps extends Omit<FileInputProps, "onError" | "file" | "fileName" | "fileSize" | "fileUrl" | "onLoad"> {
    name: string;
    onLoad?: (file: UploadedFile) => void;
}

export default function FFileInput({
    name,
    onLoad = () => undefined,
    onDeleteLoadedFile = () => undefined,
    onDeleteInitialFile = () => undefined,
    ...props
}: FFileInputProps) {
    const [field, meta, helpers] = useField<UploadedFile | File | undefined>(name);
    const [initialFilesData, setInitialFilesData] = useState<InitialFile[]>([]);

    const error = useMemo(() => (meta.touched && meta.error) || undefined, [meta.error, meta.touched]);

    useEffect(() => {
        if (!field.value) {
            return;
        }
        if (isFile(field.value)) {
            setInitialFilesData([
                {
                    fileId: 0,
                    fileName: field.value.name,
                    fileSize: field.value.size,
                    fileUrl: URL.createObjectURL(field.value),
                    data: field.value,
                },
            ]);
        } else {
            setInitialFilesData([
                {
                    fileId: field.value.id,
                    fileName: field.value.name,
                    fileSize: field.value.size,
                    fileUrl: field.value.absolutePath,
                    data: field.value,
                },
            ]);
        }
    }, []);

    const handleLoadFile = (file: UploadedFile) => {
        onLoad(file);
        helpers.setValue(file);
    };

    const handleDeleteLoadedFile = (id: number, remainFiles: (File | UploadedFile)[]) => {
        onDeleteLoadedFile(id, remainFiles);
        helpers.setValue(undefined);
    };

    const handleDeleteInitialFile = (id: number) => {
        onDeleteInitialFile(id);
        setInitialFilesData((prev) => prev.filter(({ fileId }) => id !== fileId));
    };

    return (
        <FileInput
            {...props}
            initialFilesData={initialFilesData}
            onLoad={handleLoadFile}
            onDeleteLoadedFile={handleDeleteLoadedFile}
            onDeleteInitialFile={handleDeleteInitialFile}
            error={error}
        />
    );
}
