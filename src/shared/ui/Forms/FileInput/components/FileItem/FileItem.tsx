import React, { memo, ReactNode, useMemo } from "react";
import { Box, Button, Text } from "@mantine/core";
import { FileText, Slash } from "react-feather";
import useStyles from "./FileItem.styles";
import { getFileExtension } from "../../utils";
import { Loader } from "@shared/ui";

export type FileStatus = "done" | "loading" | "error";

export interface FileItemProps {
    type: "document";
    fileId: number;
    fileName?: string;
    fileSize: string;
    status?: FileStatus;
    actionSlot?: ReactNode;
    onDownloadFile?: (fileId: number) => void;
}

const MemoizedFileItem = memo(function FileItem({
    fileId,
    fileName = "Файл",
    fileSize,
    status,
    actionSlot,
    onDownloadFile = () => undefined,
}: FileItemProps) {
    const { classes } = useStyles({ status });

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
                    <Button className={classes.buttonDownload} onClick={() => onDownloadFile(fileId)}>
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
