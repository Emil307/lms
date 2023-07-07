import { Box, Slider as MSlider, SliderProps as MSliderProps, Text } from "@mantine/core";
import { memo, useMemo } from "react";
import { ChevronRight } from "react-feather";
import useStyles from "./Slider.styles";

export interface SliderProps extends MSliderProps {
    showTextInfo?: boolean;
}

const MemoizedSlider = memo(function Slider({ showTextInfo = false, ...props }: SliderProps) {
    const { classes } = useStyles();

    const textInfo = useMemo(
        () => (
            <Box display="flex" pt={9}>
                <Text
                    sx={{
                        fontWeight: 500,
                        whiteSpace: "pre-wrap",
                        lineHeight: "16px",
                    }}>
                    {`от ${props.min} до `}
                </Text>
                <Text
                    c="primary"
                    sx={{
                        fontWeight: 500,
                        lineHeight: "16px",
                    }}>
                    {`${props.value} ₽`}
                </Text>
            </Box>
        ),
        [props.min, props.value],
    );

    return (
        <Box pt={30}>
            <MSlider {...props} classNames={classes} size={4} label={<ChevronRight />} />
            {showTextInfo && textInfo}
        </Box>
    );
});

export default MemoizedSlider;
