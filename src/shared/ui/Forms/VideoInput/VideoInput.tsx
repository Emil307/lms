import { Box, Flex, Text } from "@mantine/core";
import { UploadedFile } from "@shared/types";
import useStyles from "./VideoInput.styles";
import { getPluralString } from "@shared/utils";
import React, { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import { Button, Heading, isFile, LoadedFile, Paragraph, VideoLoaded } from "@shared/ui";
import { Plus as PlusIcon } from "react-feather";
import { isCorrectVideoFormat } from "./utils";
import { DEFAULT_VIDEO_MAX_SIZE, VIDEO_FORMATS } from "./constants";

export interface VideoInputProps {
    loadedFilesData?: UploadedFile[];
    editMode?: boolean;
    error?: string;
    maxFileSize?: number;
    onUploaded?: (file: UploadedFile) => void;
    onDeleteLoadedFile?: (file: UploadedFile) => void;
}

const VideoInput = ({
    loadedFilesData = [],
    editMode = false,
    maxFileSize = DEFAULT_VIDEO_MAX_SIZE,
    onDeleteLoadedFile = () => undefined,
    onUploaded = () => undefined,
    error,
}: VideoInputProps) => {
    const loadedFilesCount = useRef(loadedFilesData.length);
    const [files, setFiles] = useState<LoadedFile[]>(loadedFilesData.map((video, index) => ({ data: video, id: index + 1 })));

    const [errorMessage, setErrorMessage] = useState<string | undefined>(error);

    const [replaceLoadedFileId, setReplaceLoadedFileId] = useState<number | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const { classes } = useStyles();

    useEffect(() => {
        setErrorMessage(error);
    }, [error]);

    const acceptFormats = useMemo(() => {
        return Object.keys(VIDEO_FORMATS)
            .map((key) => VIDEO_FORMATS[key as keyof typeof VIDEO_FORMATS])
            .join(",");
    }, []);

    const onSelectFile = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = event.target.files;
        if (!selectedFiles || !selectedFiles.length) {
            return;
        }
        const newFiles = Array.from(selectedFiles).map((file) => {
            if (!isCorrectVideoFormat(file.type) || file.size > maxFileSize) {
                return { data: file, error: "Слишком большой файл(ы) или неверный формат" };
            }
            return { data: file };
        });
        const fileForDeleting = files.find((file) => file.id === replaceLoadedFileId);
        if (fileForDeleting && !isFile(fileForDeleting.data)) {
            onDeleteLoadedFile(fileForDeleting.data);
        }
        const adaptedFiles = newFiles.map((file) => ({ id: ++loadedFilesCount.current, data: file.data, error: file.error }));

        if (replaceLoadedFileId) {
            setFiles((state) => state.map((file) => (file.id === replaceLoadedFileId ? { ...adaptedFiles[0] } : file)));
            setReplaceLoadedFileId(null);
        } else {
            setFiles((state) => [...state, ...adaptedFiles]);
        }
        if (inputRef.current) {
            inputRef.current.value = "";
        }
    };

    const onChangeFile = (fileId: number) => {
        setReplaceLoadedFileId(fileId);
        openFileDialog();
    };

    const onAddFile = () => {
        setReplaceLoadedFileId(null);
        openFileDialog();
    };

    const openFileDialog = () => {
        setTimeout(() => {
            inputRef.current?.click();
        });
    };

    const onSuccessUpload = (fileId: number, uploadedFile: UploadedFile) => {
        setFiles((state) =>
            state.map((file) => {
                if (fileId === file.id) {
                    return { ...file, data: uploadedFile };
                }
                return file;
            })
        );
        onUploaded(uploadedFile);
    };

    const onDeleteFile = (fileId: number) => {
        setErrorMessage(undefined);
        const fileForDeleting = files.find((file) => file.id === fileId);
        setFiles((state) => state.filter((file) => file.id !== fileId));
        if (fileForDeleting && !isFile(fileForDeleting.data)) {
            onDeleteLoadedFile(fileForDeleting.data);
        }
    };

    const onError = (fileId: number, message?: string) => {
        setFiles((state) =>
            state.map((file) => {
                if (file.id === fileId) {
                    return { ...file, error: message };
                }
                return file;
            })
        );
    };

    const renderHeader = () => {
        if (!loadedFilesData.length) {
            return (
                <>
                    <Heading order={3}>Видеоуроки</Heading>
                    <Paragraph variant="text-small-m" color="neutral_gray">
                        Нет загруженных видеоуроков.
                    </Paragraph>
                </>
            );
        }
        if (editMode) {
            return (
                <>
                    <Heading order={3}>Видеоуроки</Heading>
                    <Paragraph variant="text-small-m" color="neutral_gray">
                        {`${loadedFilesData.length} ${getPluralString(
                            loadedFilesData.length,
                            "видеоурок",
                            "видеоурока",
                            "видеоуроков"
                        )} ${getPluralString(loadedFilesData.length, "загружен", "загружено", "загружено")}`}
                    </Paragraph>
                </>
            );
        }
        return (
            <Heading order={3}>
                {`${loadedFilesData.length} ${getPluralString(loadedFilesData.length, "видеоурок", "видеоурока", "видеоуроков")}`}
            </Heading>
        );
    };

    return (
        <Box className={classes.wrapper}>
            <Flex justify="space-between" align="center">
                <Flex gap={8} direction="column">
                    {renderHeader()}
                </Flex>
                {editMode && (
                    <Button className={classes.buttonAdd} variant="white" leftIcon={<PlusIcon />} size="small" onClick={onAddFile}>
                        Загрузить видео
                    </Button>
                )}
            </Flex>

            {errorMessage && <Text className={classes.error}>{errorMessage}</Text>}

            {files.length > 0 && (
                <Flex gap={24} direction="column" mt={24}>
                    {files.map((video) => (
                        <VideoLoaded
                            fileId={video.id}
                            file={video.data}
                            onSuccessUpload={onSuccessUpload}
                            onChange={onChangeFile}
                            onDelete={onDeleteFile}
                            onError={onError}
                            error={video.error}
                            editMode={editMode}
                            key={video.id}
                        />
                    ))}
                </Flex>
            )}

            <input ref={inputRef} type="file" onChange={onSelectFile} accept={acceptFormats} multiple={!replaceLoadedFileId} hidden />
        </Box>
    );
};

export default VideoInput;
