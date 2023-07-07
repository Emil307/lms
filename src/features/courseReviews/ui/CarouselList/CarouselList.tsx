import { Box, BoxProps, Skeleton } from "@mantine/core";
import { useIntersection } from "@mantine/hooks";
import { ReactNode, useEffect } from "react";
import { Carousel } from "@components/Carousel";
import { CourseReviewFromList, useCourseReviews } from "@entities/courseReview";
import { Card as CourseReviewCard } from "@features/courseReviews";
import useStyles from "./CarouselList.styles";
import { initialParams } from "./constants";

export interface CarouselListProps extends Omit<BoxProps, "children"> {
    headerSlot?: ReactNode;
    courseId?: string;
    visible?: boolean;
}

const CarouselList = ({ headerSlot, courseId, visible, ...props }: CarouselListProps) => {
    const { classes } = useStyles();

    const { data: courseReviewsData, hasNextPage, fetchNextPage, isLoading } = useCourseReviews(initialParams, visible);

    const { ref: lastElemRef, entry } = useIntersection();

    useEffect(() => {
        if (entry && entry.isIntersecting && hasNextPage) {
            fetchNextPage();
        }
    }, [entry]);

    if (!courseReviewsData?.data.length) {
        return null;
    }

    return (
        <Box {...props} className={classes.root}>
            <Skeleton visible={isLoading} mih={40} radius={24}>
                {headerSlot}
            </Skeleton>
            <Skeleton visible={isLoading} mih={410} radius={24}>
                <Carousel<CourseReviewFromList> data={courseReviewsData.data} lastElemRef={lastElemRef} slideSize={424}>
                    {(props) => <CourseReviewCard {...props} w={424} />}
                </Carousel>
            </Skeleton>
        </Box>
    );
};

export default CarouselList;
