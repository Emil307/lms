import { Box, BoxProps } from "@mantine/core";
import { useEffect } from "react";
import { useIntersection } from "@mantine/hooks";
import { useRouter } from "next/router";
import { Carousel } from "@components/Carousel";
import { CourseFromList, useCoursesInfinite } from "@entities/course";
import { Card } from "@features/courses";
import { adaptGetCoursesInfiniteRequest } from "./utils";
import { initialParams } from "./constants";

export interface CarouselListProps extends Omit<BoxProps, "children"> {
    packageId: string;
}

const CarouselList = ({ packageId, ...props }: CarouselListProps) => {
    const router = useRouter();

    const {
        data: coursePackages,
        hasNextPage,
        fetchNextPage,
    } = useCoursesInfinite(adaptGetCoursesInfiniteRequest({ ...initialParams, packageIds: [packageId] }));

    const { ref: lastElemRef, entry } = useIntersection();

    useEffect(() => {
        if (entry && entry.isIntersecting && hasNextPage) {
            fetchNextPage();
        }
    }, [entry]);

    const handleClickCourseCard = (courseId: number) => {
        router.push({ pathname: "/courses/[id]", query: { id: String(courseId) } });
    };

    return (
        <Box {...props}>
            <Carousel<CourseFromList>
                data={coursePackages?.data}
                lastElemRef={lastElemRef}
                slideSize={448}
                breakpoints={[{ maxWidth: "xs", slideSize: "100%" }]}>
                {(props) => <Card {...props} buttonVariant="favorite" w="100%" onClick={handleClickCourseCard} />}
            </Carousel>
        </Box>
    );
};

export default CarouselList;
