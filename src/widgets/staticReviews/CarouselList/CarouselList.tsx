import { Flex, FlexProps, Skeleton } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import { useIntersection } from "@mantine/hooks";
import { Carousel } from "@components/Carousel";
import { Card as StaticReviewCard } from "@features/staticReviews";
import { StaticReviewFromList, useStaticReviews } from "@entities/staticReview";
import { Heading } from "@shared/ui";
import { CONTROLS_INITIAL_SIZE, initialParams } from "./constants";
import useStyles from "./CarouselList.styles";
import { CounterSlidesInfo } from "./components";

export interface CarouselListProps extends Omit<FlexProps, "children"> {
    title?: string;
    visible?: boolean;
}

const CarouselList = ({ title, visible = true, ...props }: CarouselListProps) => {
    const { classes } = useStyles();
    const [currentSlideIndex, setCurrentSlideIndex] = useState(1);
    const rootRef = useRef<HTMLDivElement | null>(null);
    const counterSlidesRef = useRef<HTMLDivElement | null>(null);
    const { data: staticReviews, hasNextPage, fetchNextPage, isLoading } = useStaticReviews(initialParams, visible);

    useEffect(() => {
        if (!rootRef.current) {
            return;
        }
        const controls = rootRef.current.getElementsByClassName("mantine-Carousel-controls")[0] as HTMLDivElement;
        const width = counterSlidesRef.current?.clientWidth || 0;
        controls.style.width = `${CONTROLS_INITIAL_SIZE + width}px`;
    }, [currentSlideIndex, counterSlidesRef.current, rootRef]);

    const { ref: lastElemRef, entry } = useIntersection();

    useEffect(() => {
        if (entry.isIntersecting && hasNextPage) {
            fetchNextPage();
        }
    }, [entry]);

    const handleSlideChange = (slideIndex: number) => setCurrentSlideIndex(slideIndex + 1);

    if (!staticReviews?.data.length) {
        return null;
    }

    return (
        <Flex ref={rootRef} className={classes.wrapper} {...props}>
            {title && (
                <Skeleton visible={isLoading} mih={40} radius={24}>
                    <Heading>{title}</Heading>
                </Skeleton>
            )}
            <Skeleton visible={isLoading} mih={340}>
                <Carousel<StaticReviewFromList>
                    data={staticReviews.data}
                    lastElemRef={lastElemRef}
                    slideSize="100%"
                    classNames={classes}
                    onSlideChange={handleSlideChange}
                    withIndicators={false}
                    dragFree={false}>
                    {(props) => <StaticReviewCard {...props} mih={340} w="100%" />}
                </Carousel>
                <CounterSlidesInfo ref={counterSlidesRef} current={currentSlideIndex} total={staticReviews.pagination.total} />
            </Skeleton>
        </Flex>
    );
};

export default CarouselList;
