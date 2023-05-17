import { ReactNode, Ref, useMemo } from "react";
import { Carousel as MCarousel, CarouselProps as MCarouselProps } from "@mantine/carousel";
import { ArrowLeft, ArrowRight } from "react-feather";

export interface CarouselProps<T> extends Omit<MCarouselProps, "children"> {
    data?: T[];
    lastElemRef?: Ref<HTMLDivElement>;
    children: ({ data }: { data: T }) => ReactNode;
}

function Carousel<T extends { id: unknown }>({ data = [], lastElemRef, children, ...props }: CarouselProps<T>) {
    const renderSlides = useMemo(
        () =>
            data.map((item) => (
                <MCarousel.Slide ref={lastElemRef} key={`slide-${item.id}`}>
                    {children({ data: item })}
                </MCarousel.Slide>
            )),
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
