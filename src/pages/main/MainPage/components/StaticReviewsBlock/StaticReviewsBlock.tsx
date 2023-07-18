import { Box, BoxProps } from "@mantine/core";
import React from "react";
import { useIntersection } from "@mantine/hooks";
import { CarouselList as StaticReviewsCarouselList } from "@widgets/staticReviews";

export interface StaticReviewsBlockProps extends BoxProps {}

const StaticReviewsBlock = (props: StaticReviewsBlockProps) => {
    const { ref: rootBlockRef, entry } = useIntersection();

    return (
        <Box ref={rootBlockRef} {...props}>
            <StaticReviewsCarouselList visible={!!entry?.isIntersecting} />
        </Box>
    );
};

export default StaticReviewsBlock;
