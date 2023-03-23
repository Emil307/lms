import { Box, Progress as MProgress, ProgressProps as MProgressProps, Text } from "@mantine/core";
import { memo, useMemo } from "react";
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
                sx={(theme) => ({
                    fontWeight: 600,
                    fontSize: 16,
                    lineHeight: "24px",
                    color: theme.colors.dark[0],
                })}>{`${value}/${maxValue} ${label}`}</Text>
        </Box>
    );
});

export default MemoizedProgressBar;
