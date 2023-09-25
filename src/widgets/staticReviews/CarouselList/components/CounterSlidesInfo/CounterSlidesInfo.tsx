import { Flex } from "@mantine/core";
import { ForwardedRef, forwardRef } from "react";
import { Heading } from "@shared/ui";
import useStyles from "./CounterSlidesInfo.styles";

export interface CounterSlidesInfoProps {
    total?: number;
    current: number;
}

const CounterSlidesInfo = forwardRef(function CounterSlidesInfo(
    { current, total }: CounterSlidesInfoProps,
    ref: ForwardedRef<HTMLDivElement>
) {
    const { classes } = useStyles();
    return (
        <Flex className={classes.root} ref={ref}>
            <Heading order={3} color="white">{`${current}/${total}`}</Heading>
        </Flex>
    );
});

export default CounterSlidesInfo;
