import { Dropzone, DropzoneProps, FileWithPath } from "@mantine/dropzone";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Box, BoxProps, Flex, ThemeIcon } from "@mantine/core";
import _ from "lodash";
import { AlertTriangle, Info } from "react-feather";
import { getFileSize } from "@shared/utils";
import { UploadedFile } from "@shared/types";
import { Paragraph } from "@shared/ui";
import { FileInputDefault, FileInputLoaded, FileItem } from "./components";
import {
    DEFAULT_IMAGE_MAX_HEIGHT,
    DEFAULT_IMAGE_MAX_WIDTH,
    DEFAULT_MAX_FILE_SIZE,
    FileFormat,
    FileRejection,
    getCorrectFileFormatsForInput,
    InitialFile,
    isFile,
    LoadedFile,
} from "./utils";
import useStyles from "./FileInput.styles";

export interface FileInputProps extends Omit<DropzoneProps, "children" | "onLoad" | "onDrop"> {
    type: "image" | "document" | "video";
    title?: string;
    description?: string;
    descriptionInside?: string;
    exampleUrl?: string;
    fileFormats?: FileFormat[];
    maxFileSize?: number;
    imageMaxWidth?: number;
    imageMaxHeight?: number;
    withDeleteButton?: boolean;
    hideChangeButton?: boolean;
    error?: string;
    initialFilesData?: InitialFile[];
    loadedFilesData?: LoadedFile[];
    titleButtonFileDialog?: string;
    containerFilesProps?: BoxProps;
    educational?: boolean;
    onLoad: (file: UploadedFile) => void;
    onError?: () => void;
    onDeleteLoadedFile?: (id: number, remainFiles: (File | UploadedFile)[]) => void;
    onDeleteInitialFile?: (id: number) => void;
    onDownloadInitialFile?: (fileUrl: string, fileName: string) => void;
}

const MemoizedFileInput = memo(function FileInput({
    type,
    title,
    description,
    descriptionInside,
    exampleUrl,
    multiple = false,
    withDeleteButton = false,
    educational = false,
    fileFormats = [],
    maxFileSize = DEFAULT_MAX_FILE_SIZE,
    imageMaxWidth = DEFAULT_IMAGE_MAX_WIDTH,
    imageMaxHeight = DEFAULT_IMAGE_MAX_HEIGHT,
    initialFilesData = [],
    loadedFilesData = [],
    titleButtonFileDialog,
    containerFilesProps,
    onLoad,
    onError = () => undefined,
    onDeleteLoadedFile = () => undefined,
    onDeleteInitialFile = () => undefined,
    onDownloadInitialFile = () => undefined,
    ...props
}: FileInputProps) {
    const openRef = useRef<() => void>(null);
    const loadedFilesCount = useRef(0);
    const replaceLoadedFileId = useRef<number | null>(null);
    const [isErrorLoadFile, setIsErrorLoadFile] = useState(false);
    const [loadedFiles, setLoadedFiles] = useState<LoadedFile[]>(loadedFilesData);

    useEffect(() => {
        setLoadedFiles(loadedFilesData);
    }, [loadedFilesData]);

    const { classes } = useStyles({ error: (props.error && !isErrorLoadFile) || isErrorLoadFile });

    //Это для сброса значений FileInput'a в форме
    useEffect(() => {
        if (!multiple && !_.isEqual(loadedFiles, loadedFilesData)) {
            setLoadedFiles(loadedFilesData);
        }
    }, [loadedFilesData]);

    const handleOnOpenFileDialog = useCallback(() => openRef.current && openRef.current(), [openRef]);

    const handleReplaceLoadedFile = (id: number) => {
        setIsErrorLoadFile(false);
        replaceLoadedFileId.current = id;
        handleOnOpenFileDialog();
    };

    const handleDeleteLoadedFile = useCallback(
        (fileId: number) => {
            setIsErrorLoadFile(false);
            setLoadedFiles((prevLoadedFiles) => prevLoadedFiles.filter(({ id }) => id !== fileId));

            onDeleteLoadedFile(
                fileId,
                loadedFiles.map((file) => file.data)
            );
        },
        [loadedFiles, loadedFilesData]
    );

    const getRemainFilesSize = useCallback(() => {
        let overallSize = 0;
        initialFilesData.forEach((file) => (overallSize += file.fileSize));
        loadedFiles.forEach((file) => (overallSize += file.data.size));
        return maxFileSize - overallSize;
    }, [initialFilesData, loadedFiles, maxFileSize]);

    const handleRejectFiles = useCallback((files: FileRejection[]) => {
        handleLoadFile(
            files.map((file) => file.file),
            "Слишком большой файл или неверный формат"
        );
        handleErrorLoadFile("Слишком большой файл или неверный формат");
    }, []);

    const handleErrorLoadFile = (messageError?: string) => {
        setIsErrorLoadFile(!!messageError);
        onError();
    };

    const handleLoadFile = async (files: FileWithPath[], rejected?: string) => {
        setIsErrorLoadFile(false);

        if (multiple) {
            const adaptedFiles = files.map((file) => ({ id: ++loadedFilesCount.current, data: file, error: rejected }));

            if (replaceLoadedFileId.current) {
                setLoadedFiles((prevLoadedFiles) =>
                    prevLoadedFiles.map((file) => (file.id === replaceLoadedFileId.current ? { ...adaptedFiles[0] } : file))
                );
                replaceLoadedFileId.current = null;
            } else {
                setLoadedFiles((prevLoadedFiles) => [...prevLoadedFiles, ...adaptedFiles]);
            }
        } else {
            setLoadedFiles([{ id: ++loadedFilesCount.current, data: files[0], error: rejected }]);
        }
    };

    const handleDropFiles = (files: FileWithPath[]) => {
        if (!files.length) {
            replaceLoadedFileId.current = null;
            return;
        }
        handleLoadFile(files);
    };

    const handleFileDialogCancel = () => {
        replaceLoadedFileId.current = null;
    };

    const contentInsideDropzone = useMemo(() => {
        if (!multiple && type !== "document" && loadedFiles[0]?.id && !loadedFiles[0].error) {
            const fileUrl = isFile(loadedFiles[0].data) ? URL.createObjectURL(loadedFiles[0].data) : loadedFiles[0].data.absolutePath;
            return (
                <FileInputLoaded
                    fileId={loadedFiles[0].id}
                    file={loadedFiles[0].data}
                    fileUrl={fileUrl}
                    type={type}
                    error={loadedFiles[0].error}
                    imageMaxWidth={imageMaxWidth}
                    imageMaxHeight={imageMaxHeight}
                    educational={educational}
                    withDeleteButton={withDeleteButton}
                    onOpenFileDialog={handleOnOpenFileDialog}
                    onDelete={handleDeleteLoadedFile}
                    onUpdateFile={onLoad}
                    onError={handleErrorLoadFile}
                />
            );
        }
        if (!multiple && type !== "document" && initialFilesData[0]?.fileId && !loadedFiles[0]?.error) {
            return (
                <FileInputLoaded
                    fileId={initialFilesData[0].fileId}
                    file={initialFilesData[0].data}
                    fileUrl={initialFilesData[0].fileUrl}
                    type={type}
                    imageMaxWidth={imageMaxWidth}
                    imageMaxHeight={imageMaxHeight}
                    withDeleteButton={withDeleteButton}
                    educational={educational}
                    onOpenFileDialog={handleOnOpenFileDialog}
                    onDelete={onDeleteInitialFile}
                    onUpdateFile={onLoad}
                    onError={handleErrorLoadFile}
                />
            );
        }

        return (
            <FileInputDefault
                type={type}
                title={title}
                exampleUrl={exampleUrl}
                onOpenFileDialog={handleOnOpenFileDialog}
                titleButtonFileDialog={titleButtonFileDialog}
                description={descriptionInside}
            />
        );
    }, [loadedFiles, initialFilesData, multiple, type]);

    const contentOutsideDropzone = useMemo(() => {
        if (!multiple && type === "image") {
            return null;
        }
        return (
            <Box {...containerFilesProps} className={classes.containerFiles}>
                {initialFilesData.map((file) => (
                    <FileItem
                        key={file.fileId}
                        fileUrl={file.fileUrl}
                        fileName={file.fileName || "Файл"}
                        fileSize={file.fileSize ? getFileSize(file.fileSize) : ""}
                        type="document"
                        onDownloadFile={onDownloadInitialFile}
                    />
                ))}
                {loadedFiles.map((file) => (
                    <FileInputLoaded
                        key={file.id}
                        fileId={file.id}
                        //TODO: добавить сюда fileUrl для скачивания файла после его успешной загрузки
                        file={file.data}
                        fileName={file.data.name || "Файл"}
                        fileSize={file.data.size ? getFileSize(file.data.size) : ""}
                        type="document"
                        withDeleteButton={withDeleteButton}
                        educational={educational}
                        onEdit={handleReplaceLoadedFile}
                        onDelete={handleDeleteLoadedFile}
                        onUpdateFile={onLoad}
                        error={file.error}
                        onError={handleErrorLoadFile}
                    />
                ))}
            </Box>
        );
    }, [initialFilesData, loadedFiles]);

    const renderDescription = () => {
        if (!description) {
            return;
        }

        return (
            <Flex className={classes.description}>
                <ThemeIcon h={16} w={16} color="primaryHover">
                    <Info />
                </ThemeIcon>
                <Paragraph variant="text-smaller">{description}</Paragraph>
            </Flex>
        );
    };

    const errorMessage = useMemo(() => {
        if (props.error && !isErrorLoadFile) {
            return (
                <Flex className={classes.error}>
                    <AlertTriangle />
                    <Paragraph variant="text-smaller">{props.error}</Paragraph>
                </Flex>
            );
        }
        if (isErrorLoadFile && !multiple) {
            return (
                <Flex className={classes.error}>
                    <AlertTriangle />
                    <Paragraph variant="text-smaller">Слишком большой файл или неверный формат</Paragraph>
                </Flex>
            );
        }
        if (isErrorLoadFile && multiple) {
            return (
                <Flex className={classes.error}>
                    <AlertTriangle />
                    <Paragraph variant="text-smaller">Превышен максимальный объем файлов или загружен неверный формат</Paragraph>
                </Flex>
            );
        }
    }, [props.error, isErrorLoadFile, multiple]);

    return (
        <Box className={classes.wrapper}>
            <Box>
                <Dropzone
                    {...props}
                    openRef={openRef}
                    classNames={classes}
                    accept={getCorrectFileFormatsForInput(fileFormats)}
                    onDrop={handleDropFiles}
                    onFileDialogCancel={handleFileDialogCancel}
                    onReject={handleRejectFiles}
                    maxSize={getRemainFilesSize()}
                    multiple={!replaceLoadedFileId.current && multiple}
                    activateOnClick={false}>
                    {contentInsideDropzone}
                </Dropzone>
                {errorMessage}
                {renderDescription()}
            </Box>
            {contentOutsideDropzone}
        </Box>
    );
});

export default MemoizedFileInput;
