import React, { memo } from "react";
import { Box, Button, Text } from "@mantine/core";
import useStyles from "./FileInputDefaultDocument.styles";

export interface FileInputDefaultDocumentProps {
    type: "document";
    title?: string;
    description?: string;
    onOpenFileDialog: () => void;
    exampleUrl?: string;
    onDownloadExample?: () => void;
}

const MemoizedFileInputDefaultDocument = memo(function FileInputDefaultDocument({
    title = "Перетащите файлы сюда",
    description,
    onOpenFileDialog,
    exampleUrl,
    onDownloadExample,
}: FileInputDefaultDocumentProps) {
    const { classes } = useStyles();
    return (
        <Box className={classes.wrapper}>
            <Text className={classes.title}>{title}</Text>
            <Text className={classes.description}>или</Text>
            <Button
                mb={6}
                sx={(theme) => ({
                    height: "auto",
                    fontWeight: 600,
                    fontSize: 16,
                    lineHeight: "24px",
                    color: theme.colors.white,
                    padding: "12px 24px",
                })}
                type="button"
                onClick={onOpenFileDialog}>
                Выберите файлы
            </Button>
            {exampleUrl && (
                <Button
                    sx={(theme) => ({
                        height: "auto",
                        fontWeight: 600,
                        fontSize: 16,
                        lineHeight: "24px",
                        color: theme.colors.white,
                        padding: "12px 24px",
                    })}
                    type="button"
                    onClick={onDownloadExample}>
                    Скачать образец
                </Button>
            )}
            {description && (
                <Text lineClamp={2} className={classes.description}>
                    {description}
                </Text>
            )}
        </Box>
    );
});

export default MemoizedFileInputDefaultDocument;
