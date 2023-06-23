import { Flex, Text } from "@mantine/core";
import { ForwardedRef, forwardRef } from "react";
import useStyles from "./CounterSlidesInfo.styles";

export interface CounterSlidesInfoProps {
    total: number;
    current: number;
}

const CounterSlidesInfo = forwardRef(function CounterSlidesInfo(
    { current, total }: CounterSlidesInfoProps,
    ref: ForwardedRef<HTMLDivElement>
) {
    const { classes } = useStyles();
    return (
        <Flex className={classes.root} ref={ref}>
            <Text className={classes.text}>{`${current}/${total}`}</Text>
        </Flex>
    );
});

export default CounterSlidesInfo;
