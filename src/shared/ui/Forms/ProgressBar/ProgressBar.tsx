import { Box, BoxProps, Progress as MProgress, ProgressProps as MProgressProps } from "@mantine/core";
import { memo, useMemo } from "react";
import { Paragraph } from "@shared/ui";
import useStyles from "./ProgressBar.styles";

export interface ProgressBarProps extends MProgressProps {
    maxValue: number;
    hiddenLabel?: boolean;
    wrapperProps?: Omit<BoxProps, "children">;
}

const MemoizedProgressBar = memo(function ProgressBar({
    label,
    value = 0,
    maxValue = 100,
    hiddenLabel = false,
    wrapperProps,
    ...props
}: ProgressBarProps) {
    const { classes, cx } = useStyles();

    const valueProgress = useMemo(() => (value / maxValue) * 100, [value, maxValue]);

    return (
        <Box {...wrapperProps} className={cx(classes.wrapper, wrapperProps?.className)}>
            <MProgress {...props} value={valueProgress} classNames={classes} />
            {!hiddenLabel && <Paragraph variant="small-semi">{`${value}/${maxValue} ${label}`}</Paragraph>}
        </Box>
    );
});

export default MemoizedProgressBar;
