import React, { useEffect, useMemo } from "react";
import { Edit3, Trash, X } from "react-feather";
import { Flex } from "@mantine/core";
import { isFile } from "@shared/ui";
import { useUploadFile } from "@entities/storage";
import { UploadedFile } from "@shared/types";
import { FileItem, FileItemProps } from "../../FileItem";

export interface FileInputLoadedDocumentProps extends Omit<FileItemProps, "status" | "actionSlot"> {
    type: "document";
    withDeleteButton?: boolean;
    fileId: number;
    file: File | UploadedFile;
    error?: string;
    educational?: boolean;
    onDelete?: (fileId: number) => void;
    onEdit?: (fileId: number) => void;
    onUpdateFile: (fileId: number, data: UploadedFile) => void;
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
                        onUpdateFile(fileId, resp);
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
                <Flex gap={8}>
                    <Trash cursor="pointer" onClick={() => onDelete(fileId)} />
                    <Edit3 cursor="pointer" onClick={() => onEdit(fileId)} />
                </Flex>
            );

        return <X cursor="pointer" onClick={() => onDelete(fileId)} />;
    }, [status, fileId]);

    return <FileItem {...props} type={type} status={status} actionSlot={actionSlot} />;
}
