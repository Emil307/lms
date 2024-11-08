import React, { memo, ReactNode, useMemo } from "react";
import { Box, Text, Flex } from "@mantine/core";
import { Slash } from "react-feather";
import { saveAs } from "file-saver";
import { Loader, Paragraph, Button } from "@shared/ui";
import { FileStatus } from "@shared/types";
import { getFileSize } from "@shared/utils";
import useStyles from "./FileItem.styles";
import { getFileIcon } from "./utils";
import { getFileExtension } from "../../utils";

export interface FileItemProps {
    type: "document" | "video" | "images";
    fileNumber?: number;
    showFileNumber?: boolean;
    fileName?: string;
    fileUrl?: string;
    fileSize: number;
    status?: FileStatus;
    actionSlot?: ReactNode;
    error?: string;
}

const MemoizedFileItem = memo(function FileItem({
    type,
    fileNumber,
    showFileNumber,
    fileName = "Файл",
    fileUrl,
    fileSize,
    status,
    actionSlot,
    error = "Загрузка не удалась",
}: FileItemProps) {
    const { classes } = useStyles({ status });

    const handleDownloadFile = () => {
        if (fileUrl) {
            saveAs(fileUrl, fileName);
        }
    };

    const renderIcon = useMemo(() => {
        switch (status) {
            case "loading":
                return <Loader color="secondary" w={29} h={29} />;
            case "error":
                return <Slash strokeWidth={4} />;
            default:
                return (
                    <>
                        {getFileIcon(type)}
                        <Text className={classes.extension} lineClamp={1}>
                            {getFileExtension(fileName).toUpperCase()}
                        </Text>
                    </>
                );
        }
    }, [status, fileName]);

    const renderAdditionalContent = useMemo(() => {
        switch (status) {
            case "loading":
                return (
                    <Paragraph variant="text-small-m" className={classes.statusInfo}>
                        Загружается
                    </Paragraph>
                );
            case "done":
                return (
                    <Flex className={classes.additionalContent}>
                        <Paragraph variant="text-small-m" className={classes.statusInfo}>
                            Готово
                        </Paragraph>
                        <Button variant="text" className={classes.buttonDownload} onClick={handleDownloadFile} sx={{ paddingRight: 0 }}>
                            Скачать
                        </Button>
                    </Flex>
                );
            case "error":
                return (
                    <Paragraph variant="text-small-m" className={classes.statusInfo}>
                        {error}
                    </Paragraph>
                );
            default:
                return (
                    <>
                        {fileUrl && (
                            <Button variant="text" className={classes.buttonDownload} onClick={handleDownloadFile}>
                                Скачать
                            </Button>
                        )}
                    </>
                );
        }
    }, [status]);

    return (
        <Flex className={classes.root}>
            {showFileNumber && fileNumber && (
                <Flex className={classes.fileNumber}>
                    <Paragraph variant="small-semi">{fileNumber}</Paragraph>
                </Flex>
            )}
            <Flex className={classes.main}>
                <Box className={classes.icon}>{renderIcon}</Box>
                <Flex className={classes.content}>
                    <Flex gap={2} align="center" w="100%">
                        <Box className={classes.fileNameWrapper}>
                            <Paragraph variant="text-small-b" className={classes.fileName}>
                                {fileName}
                            </Paragraph>
                        </Box>
                        {fileSize > 0 && (
                            <Paragraph variant="text-small-m" color="neutralMain50" className={classes.fileSize}>
                                {getFileSize(fileSize)}
                            </Paragraph>
                        )}
                    </Flex>
                    {renderAdditionalContent}
                </Flex>
                {actionSlot && <Box>{actionSlot}</Box>}
            </Flex>
        </Flex>
    );
});

export default MemoizedFileItem;
