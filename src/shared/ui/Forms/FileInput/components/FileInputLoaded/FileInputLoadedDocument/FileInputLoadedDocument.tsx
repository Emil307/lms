import React, { useEffect, useMemo } from "react";
import { Edit3, Trash, X } from "react-feather";
import { Flex, ActionIcon } from "@mantine/core";
import { isFile } from "@shared/ui";
import { useUploadFile } from "@entities/storage";
import { UploadedFile } from "@shared/types";
import { getFileTypeRequestByExtension } from "./utils";
import { FileItem, FileItemProps } from "../../FileItem";

export interface FileInputLoadedDocumentProps extends Omit<FileItemProps, "status" | "actionSlot"> {
    type: "document" | "video" | "images";
    withDeleteButton?: boolean;
    fileNumber?: number;
    showFileNumber?: boolean;
    fileId: number;
    file: File | UploadedFile;
    error?: string;
    educational?: boolean;
    invalidateOnSuccess?: boolean;
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
    invalidateOnSuccess,
    onDelete = () => undefined,
    onEdit = () => undefined,
    onUpdateFile,
    onError,
    ...props
}: FileInputLoadedDocumentProps) {
    const { mutate: uploadFile, isLoading, isError } = useUploadFile(invalidateOnSuccess);

    useEffect(() => {
        if (isFile(file) && !error) {
            const fileType = getFileTypeRequestByExtension(file.name);
            uploadFile(
                { file, type: fileType, educational },
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
                    <ActionIcon color="dark" w={32} h={32} onClick={() => onDelete(fileId)}>
                        <Trash />
                    </ActionIcon>
                    <ActionIcon color="dark" w={32} h={32} onClick={() => onEdit(fileId)}>
                        <Edit3 />
                    </ActionIcon>
                </Flex>
            );

        return (
            <ActionIcon color="dark" w={32} h={32} onClick={() => onDelete(fileId)}>
                <X onClick={() => onDelete(fileId)} />
            </ActionIcon>
        );
    }, [status, fileId]);

    return <FileItem {...props} type={type} status={status} actionSlot={actionSlot} error={error} />;
}
