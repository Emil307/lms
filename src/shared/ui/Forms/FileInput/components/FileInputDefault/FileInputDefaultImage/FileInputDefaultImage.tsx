import { Box, ThemeIcon } from "@mantine/core";
import React, { memo, ReactNode, useMemo } from "react";
import { Image as ImageIcon, PlayCircle } from "react-feather";
import { Button } from "@shared/ui";
import useStyles from "./FileInputDefaultImage.styles";

export interface FileInputDefaultImageProps {
    type: "image" | "video";
    titleButtonFileDialog?: string;
    onOpenFileDialog: () => void;
    defaultIcon?: ReactNode;
}

const MemoizedFileInputDefaultImage = memo(function FileInputDefaultImage({
    type,
    titleButtonFileDialog = "Изменить фото",
    defaultIcon = null,
    onOpenFileDialog,
}: FileInputDefaultImageProps) {
    const { classes } = useStyles();

    const renderIconBackground = useMemo(() => {
        if (defaultIcon) {
            return defaultIcon;
        }
        if (type === "image") {
            return (
                <ThemeIcon className={classes.defaultIconBackground}>
                    <ImageIcon />
                </ThemeIcon>
            );
        }

        return (
            <ThemeIcon className={classes.defaultIconBackground}>
                <PlayCircle />
            </ThemeIcon>
        );
    }, [defaultIcon, type]);

    const renderIconImageBack = useMemo(() => {
        if (defaultIcon) {
            return defaultIcon;
        }
        if (type === "image") {
            return <ImageIcon />;
        }

        return <PlayCircle />;
    }, [defaultIcon, type]);

    return (
        <Box className={classes.root}>
            {renderIconBackground}
            <Box className={classes.imageBack}>
                <Box className={classes.control}>
                    {renderIconImageBack}
                    <Box className={classes.buttons}>
                        <Button type="button" onClick={onOpenFileDialog} fullWidth>
                            {titleButtonFileDialog}
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
});

export default MemoizedFileInputDefaultImage;
