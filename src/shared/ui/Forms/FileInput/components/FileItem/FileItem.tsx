import React, { memo, ReactNode, useMemo } from "react";
import { Box, Button, Text, Flex } from "@mantine/core";
import { FileText, Slash } from "react-feather";
import { Loader, Paragraph } from "@shared/ui";
import useStyles from "./FileItem.styles";
import { getFileExtension } from "../../utils";
import { FileStatus } from "@shared/types";
import { getFileSize } from "@shared/utils";

export interface FileItemProps {
    type: "document";
    fileName?: string;
    fileUrl?: string;
    fileSize: number;
    status?: FileStatus;
    actionSlot?: ReactNode;
    onDownloadFile?: (fileUrl: string, fileName: string) => void;
}

const MemoizedFileItem = memo(function FileItem({
    fileName = "Файл",
    fileUrl,
    fileSize,
    status,
    actionSlot,
    onDownloadFile = () => undefined,
}: FileItemProps) {
    const { classes } = useStyles({ status });

    const handleDownloadFile = () => fileUrl && onDownloadFile(fileUrl, fileName);

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
                return <Text className={classes.statusInfo}>Загружается</Text>;
            case "done":
                return <Text className={classes.statusInfo}>Готово</Text>;
            case "error":
                return <Text className={classes.statusInfo}>Загрузка не удалась</Text>;
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
            <Box className={classes.content}>
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
            </Box>
            <Box className={classes.actions}>{actionSlot}</Box>
        </Box>
    );
});

export default MemoizedFileItem;
