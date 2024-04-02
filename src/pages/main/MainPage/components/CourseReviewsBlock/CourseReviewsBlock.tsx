import { Box, FlexProps } from "@mantine/core";
import React from "react";
import { CarouselList as CourseReviewCarouselList } from "@features/courseReviews";
import { Heading } from "@shared/ui";
import { useIntersection } from "@shared/utils";

export interface CourseReviewsBlockProps extends FlexProps {}

const CourseReviewsBlock = (props: CourseReviewsBlockProps) => {
    const { ref: rootBlockRef, entry } = useIntersection();

    return (
        <Box ref={rootBlockRef}>
            <CourseReviewCarouselList
                headerSlot={<Heading mb={24}>Отзывы студентов</Heading>}
                visible={!!entry?.isIntersecting}
                {...props}
            />
        </Box>
    );
};

export default CourseReviewsBlock;
