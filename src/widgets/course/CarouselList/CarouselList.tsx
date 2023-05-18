import { Box, BoxProps } from "@mantine/core";
import { useEffect } from "react";
import { useIntersection } from "@mantine/hooks";
import { Carousel } from "@components/Carousel";
import { Course, useCoursesInfinite } from "@entities/course";
import { Card } from "@features/courses";

export interface CarouselListProps extends Omit<BoxProps, "children"> {
    packageId: string;
}

const CarouselList = ({ packageId, ...props }: CarouselListProps) => {
    const {
        data: coursePackages,
        hasNextPage,
        fetchNextPage,
    } = useCoursesInfinite({ filter: { packageIds: { items: [packageId], operator: "or" } } });
    const { ref: lastElemRef, entry } = useIntersection();

    useEffect(() => {
        if (entry?.isIntersecting && hasNextPage) {
            fetchNextPage();
        }
    }, [entry]);

    return (
        <Box {...props}>
            <Carousel<Course> data={coursePackages?.data} lastElemRef={lastElemRef} slideSize={424}>
                {(props) => <Card {...props} w={424} />}
            </Carousel>
        </Box>
    );
};

export default CarouselList;
