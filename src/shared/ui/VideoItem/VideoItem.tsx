import React, { CSSProperties, ReactNode, useMemo } from "react";
import { Flex, Text, ThemeIcon, Box } from "@mantine/core";
import { saveAs } from "file-saver";
import { isFile, Button, Paragraph, Loader } from "@shared/ui";
import { FileStatus, UploadedFile } from "@shared/types";
import { getFileSize } from "@shared/utils";
import useStyles from "./VideoItem.styles";

export interface VideoItemProps extends CSSProperties {
    file: File | UploadedFile;
    status?: FileStatus;
    error?: string;
    isLoading?: boolean;
    showOnlyUploadedFile?: boolean;
    actionSlot?: ReactNode;
    downloadButton?: boolean;
}

const VideoItem = ({
    file,
    status,
    actionSlot,
    downloadButton = false,
    isLoading = false,
    showOnlyUploadedFile = false,
    error,
    ...props
}: VideoItemProps) => {
    const { classes } = useStyles({ status });

    const downloadFile = () => {
        if (isFile(file)) {
            return saveAs(URL.createObjectURL(file), file.name);
        }
        saveAs(file.absolutePath, file.name);
    };

    const renderStatusText = () => {
        switch (status) {
            case "loading":
                return <Text className={classes.status}>Загружается</Text>;
            case "done":
                return <Text className={classes.status}>Готово</Text>;
            case "error":
                return <Text className={classes.status}>{error ? error : "Загрузка не удалась"}</Text>;
            default:
                return null;
        }
    };

    const videoData = useMemo(() => {
        if (isFile(file)) {
            return {
                name: file.name,
                size: file.size,
                src: showOnlyUploadedFile ? undefined : URL.createObjectURL(file),
            };
        }
        return {
            name: file.name,
            size: file.size,
            src: file.absolutePath,
        };
    }, [file]);

    return (
        <Flex gap={16} direction="column">
            <Box className={classes.videoWrapper}>
                {isLoading && (
                    <ThemeIcon className={classes.loader} variant="outline">
                        <Loader />
                    </ThemeIcon>
                )}
                <video src={videoData.src} className={classes.video} controls style={props}></video>
            </Box>
            <Flex gap={16} justify="space-between" align="center">
                <Flex gap={2} direction="column">
                    <Flex gap={8} align="start">
                        <Paragraph variant="text-small-m">{videoData.name}</Paragraph>
                        <Paragraph variant="text-small-m" color="neutral_gray" display="inline">
                            {getFileSize(videoData.size)}
                        </Paragraph>
                    </Flex>
                    {renderStatusText()}
                    {downloadButton && (
                        <Button className={classes.downloadButton} variant="text" size="small" onClick={downloadFile}>
                            Скачать
                        </Button>
                    )}
                </Flex>
                {actionSlot && <Flex gap={16}>{actionSlot}</Flex>}
            </Flex>
        </Flex>
    );
};

export default VideoItem;
