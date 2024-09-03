import { Box, BoxProps, Skeleton } from "@mantine/core";
import { ReactNode, useEffect, useState } from "react";
import { EmblaCarouselType } from "embla-carousel-react";
import { Carousel } from "@components/Carousel";
import { CourseReviewFromList, useCourseReviews } from "@entities/courseReview";
import { Card as CourseReviewCard } from "@features/courseReviews";
import { useIntersection } from "@shared/utils";
import useStyles from "./CarouselList.styles";
import { initialParams } from "./constants";
import { adaptGetCourseReviewsRequest } from "./utils";

export interface CarouselListProps extends Omit<BoxProps, "children"> {
    headerSlot?: ReactNode;
    courseId?: string;
    visible?: boolean;
}

const CarouselList = ({ headerSlot, courseId, visible, ...props }: CarouselListProps) => {
    const { classes } = useStyles();

    const [emblaApi, setEmblaApi] = useState<EmblaCarouselType | null>(null);
    const [_activeIndex, setActiveIndex] = useState(0);

    const {
        data: courseReviewsData,
        hasNextPage,
        fetchNextPage,
        isLoading,
    } = useCourseReviews(adaptGetCourseReviewsRequest({ ...initialParams, courseId }), visible);

    const { ref: lastElemRef, entry } = useIntersection();

    useEffect(() => {
        if (entry && entry.isIntersecting && hasNextPage) {
            fetchNextPage();
        }
    }, [entry]);

    useEffect(() => {
        if (!emblaApi) return;

        const handleSelect = () => {
            setActiveIndex(emblaApi.selectedScrollSnap());
        };

        emblaApi.on("select", handleSelect);
        handleSelect();

        return () => {
            emblaApi.off("select", handleSelect);
        };
    }, [emblaApi]);

    if (!courseReviewsData?.data.length) {
        return null;
    }

    return (
        <Box {...props} className={classes.root}>
            {headerSlot && (
                <Skeleton visible={isLoading} radius={24}>
                    {headerSlot}
                </Skeleton>
            )}

            <Skeleton visible={isLoading} mih={410} radius={24}>
                <Carousel<CourseReviewFromList>
                    data={courseReviewsData.data}
                    lastElemRef={lastElemRef}
                    breakpoints={[
                        { maxWidth: "md", slideSize: "50%" },
                        { maxWidth: "xs", slideSize: "80%" },
                        { minWidth: "lg", slideSize: "25%" },
                    ]}
                    getEmblaApi={setEmblaApi}
                    emblaApi={emblaApi}
                    align="center"
                    customStyles={useStyles}>
                    {(props) => <CourseReviewCard {...props} w="100%" />}
                </Carousel>
            </Skeleton>
        </Box>
    );
};

export default CarouselList;
