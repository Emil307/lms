import { Box, BoxProps } from "@mantine/core";
import React from "react";
import { CarouselList as StaticReviewsCarouselList } from "@widgets/staticReviews";
import { useIntersection } from "@shared/utils";

export interface StaticReviewsBlockProps extends BoxProps {}

const StaticReviewsBlock = (props: StaticReviewsBlockProps) => {
    const { ref: rootBlockRef, entry } = useIntersection();

    return (
        <Box ref={rootBlockRef}>
            <StaticReviewsCarouselList visible={!!entry?.isIntersecting} {...props} />
        </Box>
    );
};

export default StaticReviewsBlock;
