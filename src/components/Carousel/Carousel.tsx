import { ReactNode, useMemo } from "react";
import { Carousel as MCarousel, CarouselProps as MCarouselProps } from "@mantine/carousel";
import { ArrowLeft, ArrowRight } from "react-feather";

export interface CarouselProps<T> extends Omit<MCarouselProps, "children"> {
    children: ({ data }: { data: T }) => ReactNode;
    data: T[];
}

function Carousel<T extends { id: unknown }>({ data, children, ...props }: CarouselProps<T>) {
    const renderSlides = useMemo(
        () => data.map((item) => <MCarousel.Slide key={`slide-${item.id}`}>{children({ data: item })}</MCarousel.Slide>),
        [data]
    );

    return (
        <MCarousel
            {...props}
            align="start"
            slideGap={24}
            withIndicators
            dragFree
            previousControlIcon={<ArrowLeft />}
            nextControlIcon={<ArrowRight />}>
            {renderSlides}
        </MCarousel>
    );
}

export default Carousel;
