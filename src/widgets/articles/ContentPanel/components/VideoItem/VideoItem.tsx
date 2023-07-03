import React, { memo } from "react";
import { Box, Flex, Text, ThemeIcon } from "@mantine/core";
import { Play } from "react-feather";
import { Button } from "@shared/ui";
import useStyles from "./VideoItem.styles";

export interface VideoItemProps {
    fileName?: string;
    fileSize: string;
    fileUrl: string;
    onDownloadFile?: (fileUrl: string, fileName: string) => void;
}

const MemoizedVideoItem = memo(function VideoItem({
    fileName = "Файл",
    fileSize,
    fileUrl,
    onDownloadFile = () => undefined,
}: VideoItemProps) {
    const { classes } = useStyles();

    const handleDownloadFile = () => onDownloadFile(fileUrl, fileName);

    return (
        <Flex className={classes.root}>
            <Box className={classes.wrapperVideo}>
                <video className={classes.video} src={fileUrl} />
                <Box className={classes.imageBack}>
                    <ThemeIcon color="dark" sx={{ width: 48, height: 48, borderRadius: 56, paddingLeft: 4 }}>
                        <Play />
                    </ThemeIcon>
                </Box>
            </Box>

            <Box className={classes.content}>
                <Flex className={classes.fileInfo}>
                    <Text className={classes.fileName} lineClamp={1}>
                        {fileName}
                    </Text>
                    {fileSize && <Text className={classes.fileSize}>{fileSize}</Text>}
                </Flex>
                <Button variant="text" className={classes.buttonDownload} onClick={handleDownloadFile}>
                    Скачать
                </Button>
            </Box>
        </Flex>
    );
});

export default MemoizedVideoItem;
