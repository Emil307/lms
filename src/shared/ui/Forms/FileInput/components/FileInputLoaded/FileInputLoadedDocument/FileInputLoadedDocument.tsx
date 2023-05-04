import React, { useEffect, useMemo } from "react";
import { Edit3, Trash, X } from "react-feather";
import { isFile, UploadedFile } from "@shared/ui";
import { useUploadFile } from "@entities/storage";
import { FileItem, FileItemProps } from "../../FileItem";

export interface FileInputLoadedDocumentProps extends Omit<FileItemProps, "status" | "actionSlot"> {
    type: "document";
    withDeleteButton?: boolean;
    file: File | UploadedFile;
    error?: string;
    educational?: boolean;
    onDelete?: (fileId: number) => void;
    onEdit?: (fileId: number) => void;
    onUpdateFile: (data: UploadedFile) => void;
    onError: (errorMessage?: string) => void;
}

export default function FileInputLoadedDocument({
    type,
    fileId,
    file,
    error,
    educational = false,
    onDelete = () => undefined,
    onEdit = () => undefined,
    onUpdateFile,
    onError,
    ...props
}: FileInputLoadedDocumentProps) {
    const { mutate: uploadFile, isLoading, isError } = useUploadFile();

    useEffect(() => {
        if (isFile(file) && !error) {
            uploadFile(
                { file, type, educational },
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

    return <FileItem {...props} type={type} fileId={fileId} status={status} actionSlot={actionSlot} />;
}
