import { Flex, RingProgress as MRingProgress, RingProgressProps as MRingProgressProps } from "@mantine/core";
import { memo, useMemo } from "react";

import useStyles from "./RingProgress.styles";
import { Heading, Paragraph } from "@shared/ui";

export interface RingProgressProps extends Omit<MRingProgressProps, "label" | "sections" | "size"> {
    value: number;
    label?: string;
}

const MemoizedRingProgress = memo(function RingProgress({ value, label, ...props }: RingProgressProps) {
    const { classes } = useStyles();
    const sections = useMemo(() => [{ value, color: "done" }], [value]);

    const labelContent = useMemo(
        () => (
            <Flex direction="column" align="center">
                <Heading order={3}>{value}%</Heading>
                <Paragraph variant="text-caption" color="gray45">
                    {label}
                </Paragraph>
            </Flex>
        ),
        [value]
    );
    return (
        <MRingProgress
            {...props}
            size={191}
            classNames={classes}
            label={labelContent}
            sections={sections}
            roundCaps
            thickness={14}
            rootColor="white"
        />
    );
});

export default MemoizedRingProgress;
