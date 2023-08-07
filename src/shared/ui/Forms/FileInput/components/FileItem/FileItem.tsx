import React, { memo, ReactNode, useMemo } from "react";
import { Box, Button, Text, Flex } from "@mantine/core";
import { FileText, Slash } from "react-feather";
import { saveAs } from "file-saver";
import { Loader, Paragraph } from "@shared/ui";
import { FileStatus } from "@shared/types";
import { getFileSize } from "@shared/utils";
import useStyles from "./FileItem.styles";
import { getFileExtension } from "../../utils";

export interface FileItemProps {
    type: "document";
    fileName?: string;
    fileUrl?: string;
    fileSize: number;
    status?: FileStatus;
    actionSlot?: ReactNode;
}

const MemoizedFileItem = memo(function FileItem({ fileName = "Файл", fileUrl, fileSize, status, actionSlot }: FileItemProps) {
    const { classes } = useStyles({ status });

    const handleDownloadFile = () => {
        if (fileUrl) {
            saveAs(fileUrl, fileName);
        }
    };

    const renderIcon = useMemo(() => {
        switch (status) {
            case "loading":
                return <Loader color="done" w={29} h={29} />;
            case "error":
                return <Slash strokeWidth={4} />;
            default:
                return (
                    <>
                        <FileText />
                        <Text className={classes.extension}>{getFileExtension(fileName)}</Text>
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
                    <Flex gap={8} align="center">
                        <Paragraph variant="text-small-m" className={classes.statusInfo}>
                            Готово
                        </Paragraph>
                        <Button className={classes.buttonDownload} onClick={handleDownloadFile}>
                            Скачать
                        </Button>
                    </Flex>
                );
            case "error":
                return (
                    <Paragraph variant="text-small-m" className={classes.statusInfo}>
                        Загрузка не удалась
                    </Paragraph>
                );
            default:
                return (
                    <Button className={classes.buttonDownload} onClick={handleDownloadFile}>
                        Скачать
                    </Button>
                );
        }
    }, [status]);

    return (
        <Box className={classes.root}>
            <Box className={classes.icon}>{renderIcon}</Box>
            <Flex gap={2} direction="column" className={classes.content}>
                <Flex gap={2} align="center">
                    <Paragraph variant="text-small-semi" color="dark" lineClamp={1}>
                        {fileName}
                    </Paragraph>
                    {fileSize && (
                        <Paragraph variant="text-small-m" color="gray45">
                            {getFileSize(fileSize)}
                        </Paragraph>
                    )}
                </Flex>
                {renderAdditionalContent}
            </Flex>
            <Box>{actionSlot}</Box>
        </Box>
    );
});

export default MemoizedFileItem;
