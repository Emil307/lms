import React, { memo } from "react";
import { Button, Flex } from "@mantine/core";
import { Paragraph } from "@shared/ui/Typography";
import useStyles from "./FileInputDefaultDocument.styles";

export interface FileInputDefaultDocumentProps {
    type: "document" | "video";
    title?: string;
    description?: string;
    onOpenFileDialog: () => void;
    exampleUrl?: string;
    onDownloadExample?: () => void;
    disabled?: boolean;
}

const MemoizedFileInputDefaultDocument = memo(function FileInputDefaultDocument({
    title = "Перетащите файлы сюда",
    description,
    onOpenFileDialog,
    disabled,
    exampleUrl,
    onDownloadExample,
}: FileInputDefaultDocumentProps) {
    const { classes } = useStyles();
    return (
        <Flex className={classes.wrapper}>
            <Paragraph variant="text-small-m">{title}</Paragraph>
            <Paragraph variant="text-caption" color="gray45">
                или
            </Paragraph>
            <Button
                mb={6}
                sx={(theme) => ({
                    height: "auto",
                    fontWeight: 600,
                    fontSize: 16,
                    lineHeight: "24px",
                    color: theme.colors.white[0],
                    padding: "12px 24px",
                })}
                type="button"
                onClick={onOpenFileDialog}
                disabled={disabled}>
                Выберите файлы
            </Button>
            {exampleUrl && (
                <Button
                    sx={(theme) => ({
                        height: "auto",
                        fontWeight: 600,
                        fontSize: 16,
                        lineHeight: "24px",
                        color: theme.colors.white[0],
                        padding: "12px 24px",
                    })}
                    type="button"
                    onClick={onDownloadExample}>
                    Скачать образец
                </Button>
            )}
            {description && (
                <Paragraph variant="text-caption" color="gray45" ta="center">
                    {description}
                </Paragraph>
            )}
        </Flex>
    );
});

export default MemoizedFileInputDefaultDocument;
