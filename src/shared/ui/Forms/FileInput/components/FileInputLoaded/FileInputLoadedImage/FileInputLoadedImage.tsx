import NextImage from "next/image";
import React, { useEffect } from "react";
import { Box, Button, Loader, ThemeIcon } from "@mantine/core";
import { Image as ImageIcon } from "react-feather";
import { UseMutationResult } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { isFile, UploadedFile } from "@shared/ui";
import { UploadFileRequest } from "@entities/storage";
import { FormErrorResponse } from "@shared/utils";
import useStyles from "./FileInputLoadedImage.styles";

export interface FileInputLoadedImageProps {
    type: "image";
    file: File | UploadedFile;
    fileId: number;
    fileUrl: string;
    imageMaxWidth: number;
    imageMaxHeight: number;
    withDeleteButton?: boolean;
    error?: string;
    onOpenFileDialog?: () => void;
    onDelete?: (fileId: number) => void;
    useUploadFile: () => UseMutationResult<UploadedFile, AxiosError<FormErrorResponse>, UploadFileRequest>;
    onUpdateFile: (data: UploadedFile) => void;
    onError: (errorMessage?: string) => void;
}

export default function FileInputLoadedImage({
    fileId,
    file,
    fileUrl,
    imageMaxWidth,
    imageMaxHeight,
    error,
    withDeleteButton = false,
    onOpenFileDialog = () => undefined,
    onDelete = () => undefined,
    useUploadFile,
    onUpdateFile,
    onError,
}: FileInputLoadedImageProps) {
    const { classes } = useStyles();

    const { mutate: uploadFile, isLoading } = useUploadFile();

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

    return (
        <Box className={classes.root}>
            {isLoading && (
                <ThemeIcon className={classes.loader} variant="outline">
                    <Loader />
                </ThemeIcon>
            )}
            <NextImage
                src={fileUrl}
                width={imageMaxWidth}
                height={imageMaxHeight}
                alt="file-preview"
                objectFit="scale-down"
                layout="intrinsic"
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
