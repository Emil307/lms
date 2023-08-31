import { Box, Slider as MSlider, SliderProps as MSliderProps, ThemeIcon } from "@mantine/core";
import { memo, useMemo } from "react";
import { ChevronRight } from "react-feather";
import { Paragraph } from "@shared/ui";
import useStyles from "./Slider.styles";

export interface SliderProps extends MSliderProps {
    showTextInfo?: boolean;
}

const MemoizedSlider = memo(function Slider({ showTextInfo = false, ...props }: SliderProps) {
    const { classes } = useStyles();

    const textInfo = useMemo(
        () => (
            <Box display="flex" pt={9}>
                <Paragraph
                    variant="text-small-m"
                    sx={{
                        whiteSpace: "pre-wrap",
                    }}>
                    {`от ${props.min} до `}
                </Paragraph>
                <Paragraph variant="text-small-m" color="primary">
                    {`${props.value} ₽`}
                </Paragraph>
            </Box>
        ),
        [props.min, props.value]
    );

    return (
        <Box pt={30}>
            <MSlider
                label={null}
                showLabelOnHover={false}
                classNames={classes}
                size={4}
                thumbChildren={
                    <ThemeIcon variant="filled" className={classes.iconChevronRight}>
                        <ChevronRight size={16} />
                    </ThemeIcon>
                }
                {...props}
            />
            {showTextInfo && textInfo}
        </Box>
    );
});

export default MemoizedSlider;
