import NextImage from "next/image";
import React, { useEffect } from "react";
import { Box, Button, ThemeIcon } from "@mantine/core";
import { Image as ImageIcon } from "react-feather";
import { isFile, Loader } from "@shared/ui";
import { useUploadFile } from "@entities/storage";
import { UploadedFile } from "@shared/types";
import useStyles from "./FileInputLoadedImage.styles";

export interface FileInputLoadedImageProps {
    type: "image";
    file: File | UploadedFile;
    fileId: number;
    fileUrl: string;
    imageMaxWidth: number;
    imageMaxHeight: number;
    withDeleteButton?: boolean;
    educational?: boolean;
    error?: string;
    invalidateOnSuccess?: boolean;
    onOpenFileDialog?: () => void;
    onDelete?: (fileId: number) => void;
    onUpdateFile: (fileId: number, data: UploadedFile) => void;
    onError: (errorMessage?: string) => void;
}

export default function FileInputLoadedImage({
    type,
    fileId,
    file,
    fileUrl,
    imageMaxWidth,
    imageMaxHeight,
    educational,
    error,
    withDeleteButton = false,
    invalidateOnSuccess,
    onOpenFileDialog = () => undefined,
    onDelete = () => undefined,
    onUpdateFile,
    onError,
}: FileInputLoadedImageProps) {
    const { classes } = useStyles();

    const { mutate: uploadFile, isLoading } = useUploadFile(invalidateOnSuccess);

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

    return (
        <Box className={classes.root}>
            {isLoading && (
                <ThemeIcon className={classes.loader}>
                    <Loader />
                </ThemeIcon>
            )}
            <NextImage
                src={fileUrl}
                width={imageMaxWidth}
                height={imageMaxHeight}
                alt="file-preview"
                style={{
                    maxWidth: "100%",
                    height: "auto",
                    objectFit: "scale-down",
                }}
            />
            <Box className={classes.imageBack}>
                <Box className={classes.control}>
                    <ImageIcon />
                    <Box className={classes.buttons}>
                        <Button type="button" onClick={onOpenFileDialog} fullWidth>
                            Изменить фото
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
