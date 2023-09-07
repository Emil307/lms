import { Box, ThemeIcon } from "@mantine/core";
import React, { memo, ReactNode, useMemo } from "react";
import { Image as ImageIcon } from "react-feather";
import { Button } from "@shared/ui";
import useStyles from "./FileInputDefaultImage.styles";

export interface FileInputDefaultImageProps {
    type: "image";
    titleButtonFileDialog?: string;
    onOpenFileDialog: () => void;
    defaultIcon?: ReactNode;
    disabled?: boolean;
}

const MemoizedFileInputDefaultImage = memo(function FileInputDefaultImage({
    titleButtonFileDialog = "Изменить фото",
    defaultIcon = null,
    onOpenFileDialog,
    disabled,
}: FileInputDefaultImageProps) {
    const { classes } = useStyles();

    const renderIconBackground = useMemo(() => {
        if (defaultIcon) {
            return defaultIcon;
        }
        return (
            <ThemeIcon className={classes.defaultIconBackground}>
                <ImageIcon />
            </ThemeIcon>
        );
    }, [defaultIcon]);

    const renderIconImageBack = useMemo(() => {
        if (defaultIcon) {
            return defaultIcon;
        }
        return <ImageIcon />;
    }, [defaultIcon]);

    return (
        <Box className={classes.root}>
            {renderIconBackground}
            <Box className={classes.imageBack}>
                <Box className={classes.control}>
                    {renderIconImageBack}
                    <Box className={classes.buttons}>
                        <Button type="button" onClick={onOpenFileDialog} disabled={disabled} fullWidth>
                            {titleButtonFileDialog}
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
});

export default MemoizedFileInputDefaultImage;
