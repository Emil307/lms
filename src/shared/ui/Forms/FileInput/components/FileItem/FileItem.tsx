import React, { memo, ReactNode, useMemo } from "react";
import { Box, Button, Text } from "@mantine/core";
import { FileText, Slash } from "react-feather";
import { Loader } from "@shared/ui";
import useStyles from "./FileItem.styles";
import { getFileExtension } from "../../utils";

export type FileStatus = "done" | "loading" | "error";

export interface FileItemProps {
    type: "document";
    fileName?: string;
    fileUrl?: string;
    fileSize: string;
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
                <Box className={classes.fileInfo}>
                    <Text className={classes.fileName} lineClamp={1}>
                        {fileName}
                    </Text>
                    {fileSize && <Text className={classes.fileSize}>{fileSize}</Text>}
                </Box>
                {renderAdditionalContent}
            </Box>
            <Box className={classes.actions}>{actionSlot}</Box>
        </Box>
    );
});

export default MemoizedFileItem;
