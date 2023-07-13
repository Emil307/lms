import { Box, RingProgress as MRingProgress, RingProgressProps as MRingProgressProps, Text } from "@mantine/core";
import { memo, useMemo } from "react";

import useStyles from "./RingProgress.styles";

export interface RingProgressProps extends Omit<MRingProgressProps, "label" | "sections" | "size"> {
    value: number;
    label?: string;
    size?: "small" | "normal";
}

const MemoizedRingProgress = memo(function RingProgress({ value, label, size = "normal", ...props }: RingProgressProps) {
    const { classes } = useStyles({ size });
    const sections = useMemo(() => [{ value, color: "secondary" }], [value]);
    const thickness = useMemo(() => (size === "small" ? 4.8 : 9.6), [size]);
    const sizeValue = useMemo(() => (size === "small" ? 64 : 128), [size]);
    const labelContent = useMemo(
        () => (
            <Box>
                <Text color="dark" align="center" size="xl" lh="24px" fw={600} {...(size === "small" && { size: "sm", lh: "16px" })}>
                    {value}%
                </Text>
                {size !== "small" && (
                    <Text color="gray45" align="center" mx="auto" lineClamp={1} size="xs" lh="16px" fw={500}>
                        {label}
                    </Text>
                )}
            </Box>
        ),
        [value, size]
    );
    return (
        <MRingProgress
            {...props}
            size={sizeValue}
            classNames={classes}
            label={labelContent}
            sections={sections}
            roundCaps
            thickness={thickness}
        />
    );
});

export default MemoizedRingProgress;
