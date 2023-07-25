import { ActionIcon } from "@mantine/core";
import React, { useEffect, useMemo } from "react";
import { Edit3 as EditIcon, Trash2 as TrashIcon } from "react-feather";
import { isFile, VideoItem } from "@shared/ui";
import { useUploadFile } from "@entities/storage";
import { UploadedFile } from "@shared/types";
import useStyles from "./VideoLoaded.styles";

export interface VideoLoadedProps {
    fileId: number;
    file: File | UploadedFile;
    onSuccessUpload: (fileId: number, data: UploadedFile) => void;
    onChange: (fileId: number) => void;
    onDelete: (fileId: number) => void;
    onError: (fileId: number, message?: string) => void;
    error?: string;
    editMode: boolean;
}

const VideoLoaded = ({ fileId, file, onSuccessUpload, onChange, onDelete, onError, error, editMode }: VideoLoadedProps) => {
    const { classes } = useStyles();

    const { mutate: uploadFile, isLoading, isError } = useUploadFile();

    useEffect(() => {
        if (isFile(file) && !error) {
            uploadFile(
                { file, type: "video" },
                {
                    onSuccess: (response: UploadedFile) => {
                        onSuccessUpload(fileId, response);
                    },
                    onError: (error) => {
                        onError(fileId, error.response?.data.message);
                    },
                }
            );
        }
    }, [file, error]);

    const status = useMemo(() => {
        if (!editMode) {
            return;
        }
        if (isLoading) {
            return "loading";
        }
        if (isError || error) {
            return "error";
        }
        return "done";
    }, [isLoading, isError]);

    const actionSlot = useMemo(() => {
        if (!editMode) {
            return;
        }
        switch (status) {
            case "done":
                return (
                    <>
                        <ActionIcon className={classes.icon} color="dark" onClick={() => onDelete(fileId)}>
                            <TrashIcon />
                        </ActionIcon>
                        <ActionIcon className={classes.icon} color="dark" onClick={() => onChange(fileId)}>
                            <EditIcon />
                        </ActionIcon>
                    </>
                );
            case "error":
                return (
                    <ActionIcon className={classes.icon} color="dark" onClick={() => onDelete(fileId)}>
                        <TrashIcon />
                    </ActionIcon>
                );
            default:
                return null;
        }
    }, [status, file, editMode]);

    return (
        <VideoItem
            file={file}
            status={status}
            isLoading={isLoading}
            actionSlot={actionSlot}
            downloadButton={!editMode}
            error={error}
            showOnlyUploadedFile
        />
    );
};

export default VideoLoaded;
