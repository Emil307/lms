import React, { CSSProperties, ReactNode, useMemo } from "react";
import { Flex, ThemeIcon, Box } from "@mantine/core";
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
    autoAdapt?: boolean;
}

const VideoItem = ({
    file,
    status,
    actionSlot,
    downloadButton = false,
    isLoading = false,
    showOnlyUploadedFile = false,
    autoAdapt = false,
    error,
    ...props
}: VideoItemProps) => {
    const { classes } = useStyles({ status, autoAdapt });

    const downloadFile = () => {
        if (isFile(file)) {
            return saveAs(URL.createObjectURL(file), file.name);
        }
        saveAs(file.absolutePath, file.name);
    };

    const renderStatusText = () => {
        switch (status) {
            case "loading":
                return (
                    <Paragraph variant="text-small-m" className={classes.status}>
                        Загружается
                    </Paragraph>
                );
            case "done":
                return (
                    <Paragraph variant="text-small-m" className={classes.status}>
                        Готово
                    </Paragraph>
                );
            case "error":
                return (
                    <Paragraph variant="text-small-m" className={classes.status}>
                        {error ? error : "Загрузка не удалась"}
                    </Paragraph>
                );
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
                    <ThemeIcon className={classes.loader}>
                        <Loader />
                    </ThemeIcon>
                )}
                <video src={videoData.src} className={classes.video} controls style={props}></video>
            </Box>
            <Flex gap={16} justify="space-between" align="center">
                <Flex className={classes.extra}>
                    <Flex gap={8} align="start">
                        <Paragraph variant="text-small-m" lineClamp={1}>
                            {videoData.name}
                        </Paragraph>
                        <Paragraph variant="text-small-m" className={classes.size}>
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
