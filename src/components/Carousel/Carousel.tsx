import { ReactNode, Ref, useMemo } from "react";
import { Carousel as MCarousel, CarouselProps as MCarouselProps } from "@mantine/carousel";
import { ArrowLeft, ArrowRight } from "react-feather";
import useStyles from "./Carousel.styles";
import { EmblaCarouselType } from "embla-carousel-react";

export interface CarouselProps<T> extends Omit<MCarouselProps, "children"> {
    data?: T[];
    lastElemRef?: Ref<HTMLDivElement>;
    emblaApi?: EmblaCarouselType | null;
    children: ({ data, isActive }: { data: T; isActive: boolean }) => ReactNode;
    height?: number;
    customStyles?: () => { classes: any; cx: (...args: any) => string };
}

function Carousel<T extends { id: unknown }>({ data = [], lastElemRef, emblaApi, children, customStyles, ...props }: CarouselProps<T>) {
    const defaultStyles = useStyles();
    const { classes, cx } = customStyles ? customStyles() : defaultStyles;
    const renderSlides = useMemo(
        () =>
            data.map((item, index) => (
                <MCarousel.Slide
                    ref={lastElemRef}
                    key={`${item.id}`}
                    className={cx(classes.slide, { [classes.activeSlide]: emblaApi?.selectedScrollSnap() === index })}>
                    {children({ data: item, isActive: emblaApi?.selectedScrollSnap() === index })}
                </MCarousel.Slide>
            )),
        [data, emblaApi, classes, cx]
    );

    return (
        <MCarousel
            classNames={classes}
            align="start"
            slideGap={24}
            previousControlIcon={<ArrowLeft />}
            nextControlIcon={<ArrowRight />}
            slidesToScroll={1}
            {...props}>
            {renderSlides}
        </MCarousel>
    );
}

export default Carousel;
