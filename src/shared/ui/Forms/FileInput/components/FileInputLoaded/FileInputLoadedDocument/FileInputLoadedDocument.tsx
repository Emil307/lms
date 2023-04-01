import { UseMutationResult } from "@tanstack/react-query";
import React, { useEffect, useMemo } from "react";
import { Edit3, Trash, X } from "react-feather";
import { AxiosError } from "axios";
import { isFile, UploadedFile } from "@shared/ui";
import { UploadFileRequest } from "@entities/storage";
import { FormErrorResponse } from "@shared/utils";
import { FileItem, FileItemProps } from "../../FileItem";

export interface FileInputLoadedDocumentProps extends Omit<FileItemProps, "status" | "actionSlot"> {
    type: "document";
    withDeleteButton?: boolean;
    file: File | UploadedFile;
    error?: string;
    onDelete?: (fileId: number) => void;
    onEdit?: (fileId: number) => void;
    useUploadFile: () => UseMutationResult<UploadedFile, AxiosError<FormErrorResponse>, UploadFileRequest>;
    onUpdateFile: (data: UploadedFile) => void;
    onError: (errorMessage?: string) => void;
}

export default function FileInputLoadedDocument({
    fileId,
    file,
    error,
    onDelete = () => undefined,
    onEdit = () => undefined,
    useUploadFile,
    onUpdateFile,
    onError,
    ...props
}: FileInputLoadedDocumentProps) {
    const { mutate: uploadFile, isLoading, isError } = useUploadFile();

    useEffect(() => {
        if (isFile(file) && !error) {
            uploadFile(
                { file },
                {
                    onSuccess: (resp) => {
                        onUpdateFile(resp);
                    },
                    onError: (error) => {
                        onError(error.response?.data.message);
                    },
                }
            );
        }
    }, [file, error]);

    const status = useMemo(() => {
        if (isLoading) return "loading";
        if (error || isError) return "error";
        return "done";
    }, [isLoading, isError, error]);

    const actionSlot = useMemo(() => {
        if (status === "done")
            return (
                <>
                    <Trash cursor="pointer" onClick={() => onDelete(fileId)} />
                    <Edit3 cursor="pointer" onClick={() => onEdit(fileId)} />
                </>
            );

        return <X cursor="pointer" onClick={() => onDelete(fileId)} />;
    }, [status, fileId]);

    return <FileItem {...props} fileId={fileId} status={status} actionSlot={actionSlot} />;
}
