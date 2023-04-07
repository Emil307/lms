import React, { useEffect } from "react";
import { Box, Button, Loader, ThemeIcon } from "@mantine/core";
import { PlayCircle } from "react-feather";
import { isFile, UploadedFile } from "@shared/ui";
import { useUploadFile } from "@entities/storage";
import useStyles from "./FileInputLoadedVideo.styles";

export interface FileInputLoadedVideoProps {
    type: "video";
    file: File | UploadedFile;
    fileId: number;
    fileUrl: string;
    imageMaxWidth: number;
    imageMaxHeight: number;
    withDeleteButton?: boolean;
    error?: string;
    onOpenFileDialog?: () => void;
    onDelete?: (fileId: number) => void;
    onUpdateFile: (data: UploadedFile) => void;
    onError: (errorMessage?: string) => void;
}

export default function FileInputLoadedVideo({
    type,
    fileId,
    file,
    fileUrl,
    error,
    withDeleteButton = false,
    onOpenFileDialog = () => undefined,
    onDelete = () => undefined,
    onUpdateFile,
    onError,
}: FileInputLoadedVideoProps) {
    const { classes } = useStyles();

    const { mutate: uploadFile, isLoading } = useUploadFile();

    useEffect(() => {
        if (isFile(file) && !error) {
            uploadFile(
                { file, type },
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

    return (
        <Box className={classes.root}>
            {isLoading && (
                <ThemeIcon className={classes.loader} variant="outline">
                    <Loader />
                </ThemeIcon>
            )}
            <video className={classes.video} src={fileUrl} />
            <Box className={classes.imageBack}>
                <Box className={classes.control}>
                    <PlayCircle />
                    <Box className={classes.buttons}>
                        <Button type="button" onClick={onOpenFileDialog} fullWidth>
                            Изменить Видео
                        </Button>
                        {withDeleteButton && (
                            <Button type="button" title="Удалить" onClick={() => onDelete(fileId)} fullWidth>
                                Удалить
                            </Button>
                        )}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
