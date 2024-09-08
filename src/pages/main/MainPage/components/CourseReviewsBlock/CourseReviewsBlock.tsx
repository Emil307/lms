import { Box, Flex, FlexProps, Text } from "@mantine/core";
import React from "react";
import { CarouselList as CourseReviewCarouselList } from "@features/courseReviews";
import { Heading } from "@shared/ui";
import useStyles from "./CourseReviewBlock.styles";

export interface CourseReviewsBlockProps extends FlexProps {}

const CourseReviewsBlock = (props: CourseReviewsBlockProps) => {
    const { classes } = useStyles();

    return (
        <Box>
            <CourseReviewCarouselList
                headerSlot={
                    <Heading mb={48}>
                        <Flex direction="column" gap={24}>
                            <Text ta="center" className={classes.title}>
                                О нас говорят
                            </Text>
                            <Text ta="center" className={classes.description}>
                                Расширяйте кругозор и получайте удовольствие <br /> от новых знаний с нашими наборами курсов.
                            </Text>
                        </Flex>
                    </Heading>
                }
                {...props}
            />
        </Box>
    );
};

export default CourseReviewsBlock;
