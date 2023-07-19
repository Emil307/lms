import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useField } from "formik";
import { UploadedFile } from "@shared/types";
import { VideoInput, VideoInputProps } from "@shared/ui";

export interface FVideoInputProps extends VideoInputProps {
    name: string;
}

const FVideoInput = ({ name, ...props }: FVideoInputProps) => {
    const [field, meta, helpers] = useField<UploadedFile[]>(name);
    const [files, setFiles] = useState<UploadedFile[]>(field.value);

    const error = useMemo(() => (meta.touched && meta.error) || undefined, [meta.error, meta.touched]);

    useEffect(() => {
        helpers.setValue(files);
    }, [files]);

    const handleUploadedFile = (file: UploadedFile) => {
        setFiles((state) => [...state, file]);
    };

    const handleDeleteLoadedFile = useCallback(
        (fileForDeleting: UploadedFile) => {
            setFiles((state) => state.filter((file) => file.id !== fileForDeleting.id));
        },
        [field.value]
    );

    return (
        <VideoInput
            {...props}
            loadedFilesData={field.value}
            onUploaded={handleUploadedFile}
            onDeleteLoadedFile={handleDeleteLoadedFile}
            error={error}
        />
    );
};

export default FVideoInput;
