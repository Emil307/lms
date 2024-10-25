import { Box, FlexProps, Stack } from "@mantine/core";
import React from "react";
import { CarouselList as CourseReviewCarouselList } from "@features/courseReviews";
import { Heading } from "@shared/ui";

export interface CourseReviewsBlockProps extends FlexProps {}

const CourseReviewsBlock = (props: CourseReviewsBlockProps) => {
    return (
        <Box>
            <CourseReviewCarouselList
                headerSlot={
                    <Stack spacing={24} mb={48} align="center">
                        <Heading order={1} ta="center" color="dark">
                            О нас говорят
                        </Heading>
                        <Heading order={3} ta="center" color="neutralMain50" maw={500}>
                            Расширяйте кругозор и&nbsp;получайте удовольствие от&nbsp;новых знаний с&nbsp;нашими наборами курсов
                        </Heading>
                    </Stack>
                }
                {...props}
            />
        </Box>
    );
};

export default CourseReviewsBlock;
