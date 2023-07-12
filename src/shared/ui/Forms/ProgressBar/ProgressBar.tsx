import { Box, Progress as MProgress, ProgressProps as MProgressProps } from "@mantine/core";
import { memo, useMemo } from "react";
import { Paragraph } from "@shared/ui";
import useStyles from "./ProgressBar.styles";

export interface ProgressBarProps extends MProgressProps {
    maxValue: number;
    hiddenLabel?: boolean;
}

const MemoizedProgressBar = memo(function ProgressBar({
    label,
    value = 0,
    maxValue = 100,
    hiddenLabel = false,
    ...props
}: ProgressBarProps) {
    const { classes } = useStyles();

    const valueProgress = useMemo(() => (value / maxValue) * 100, [value, maxValue]);

    return (
        <Box className={classes.wrapper}>
            <MProgress {...props} value={valueProgress} classNames={classes} />
            {!hiddenLabel && <Paragraph variant="small-semi">{`${value}/${maxValue} ${label}`}</Paragraph>}
        </Box>
    );
});

export default MemoizedProgressBar;
