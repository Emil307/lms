import { Box, Progress as MProgress, ProgressProps as MProgressProps, Text } from "@mantine/core";
import { memo, useMemo } from "react";
import { ManropeFont } from "@app/providers/Theme/fonts";
import useStyles from "./ProgressBar.styles";

export interface ProgressBarProps extends MProgressProps {
    maxValue: number;
}

const MemoizedProgressBar = memo(function ProgressBar({ label, value = 0, maxValue = 100, ...props }: ProgressBarProps) {
    const { classes } = useStyles();

    const valueProgress = useMemo(() => (value / maxValue) * 100, [value, maxValue]);

    return (
        <Box className={classes.wrapper}>
            <MProgress {...props} value={valueProgress} classNames={classes} />
            <Text
                sx={{
                    fontFamily: ManropeFont.style.fontFamily,
                    fontWeight: ManropeFont.style.fontWeight,
                }}>{`${value}/${maxValue} ${label}`}</Text>
        </Box>
    );
});

export default MemoizedProgressBar;
