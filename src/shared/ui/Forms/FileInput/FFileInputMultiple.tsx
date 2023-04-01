import React, { useCallback, useMemo } from "react";
import { useField } from "formik";
import FileInput, { FileInputProps } from "./FileInput";
import { InitialFile, UploadedFile } from "./utils";

export interface FFileInputMultipleProps extends Omit<FileInputProps, "onLoad"> {
    nameForInitialFiles?: string;
    nameForLoadedFiles: string;
    onLoad?: (file: UploadedFile) => void;
}

export default function FFileInputMultiple({
    nameForInitialFiles = "",
    nameForLoadedFiles,
    onLoad = () => undefined,
    onDeleteLoadedFile = () => undefined,
    onDeleteInitialFile = () => undefined,
    ...props
}: FFileInputMultipleProps) {
    const [fieldInitial, , helpersInitial] = useField<UploadedFile[]>(nameForInitialFiles);
    const [fieldLoaded, metaLoaded, helpersLoaded] = useField<(File | UploadedFile)[]>(nameForLoadedFiles);

    const handleLoadFile = useCallback((file: UploadedFile) => {
        onLoad(file);
        helpersLoaded.setValue([...fieldLoaded.value, file]);
    }, []);

    const handleDeleteInitialFile = useCallback((id: number) => {
        onDeleteInitialFile(id);
        helpersInitial.setValue(fieldInitial.value.filter((file) => file.id !== id));
    }, []);

    const handleDeleteLoadedFile = useCallback((id: number, remainFiles: (File | UploadedFile)[]) => {
        onDeleteLoadedFile(id, remainFiles);
        helpersLoaded.setValue(remainFiles);
    }, []);

    const initialFilesData = useMemo((): InitialFile[] => {
        if (!fieldInitial.name) return [];
        return Array.from(fieldInitial.value).map((file) => ({
            fileId: file.id,
            fileName: file.name,
            fileSize: file.size,
            fileUrl: file.absolutePath,
        }));
    }, [fieldInitial.name, fieldInitial.value]);

    const loadedFilesData = useMemo(
        () =>
            Array.from(fieldLoaded.value).map((file, index) => ({
                id: index + 1,
                data: file,
            })),
        [fieldLoaded.value]
    );

    const error = useMemo(() => (metaLoaded.touched && metaLoaded.error) || undefined, [metaLoaded.error, metaLoaded.touched]);

    return (
        <FileInput
            {...props}
            initialFilesData={initialFilesData}
            loadedFilesData={loadedFilesData}
            onLoad={handleLoadFile}
            onDeleteInitialFile={handleDeleteInitialFile}
            onDeleteLoadedFile={handleDeleteLoadedFile}
            error={error}
            multiple
        />
    );
}
