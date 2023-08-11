import { Box, BoxProps, Flex, TitleProps, Skeleton } from "@mantine/core";
import { useEffect } from "react";
import { useIntersection } from "@mantine/hooks";
import { Carousel } from "@components/Carousel";
import { CoursePackage, useCoursePackages } from "@entities/coursePackage";
import { CourseListFromPackage, Card as CoursePackageCard } from "@features/coursePackages";
import { Heading, Paragraph } from "@shared/ui";
import { adaptGetCoursePackagesRequest } from "./utils";

export interface CarouselListProps extends Omit<BoxProps, "children"> {
    title: string;
    titleProps?: TitleProps;
    description?: string;
    exceptionCoursePackageId?: string;
    visible?: boolean;
    courseId?: string;
}

const CarouselList = ({ title, description, titleProps, exceptionCoursePackageId, courseId, visible, ...props }: CarouselListProps) => {
    const {
        data: coursePackages,
        hasNextPage,
        fetchNextPage,
        isLoading,
    } = useCoursePackages(adaptGetCoursePackagesRequest({ exceptionCoursePackageId, courseId }), visible);
    const { ref: lastElemRef, entry } = useIntersection();

    useEffect(() => {
        if (entry && entry.isIntersecting && hasNextPage) {
            fetchNextPage();
        }
    }, [entry]);

    if (!coursePackages?.data.length) {
        return null;
    }

    return (
        <Box {...props} w="100%">
            <Flex direction="column" gap={8} mb={32}>
                <Skeleton visible={isLoading} radius={24}>
                    <Heading {...titleProps}>{title}</Heading>
                </Skeleton>
                {description && <Paragraph variant="small-m">{description}</Paragraph>}
            </Flex>
            <Skeleton visible={isLoading} mih={420} radius={16}>
                <Carousel<CoursePackage>
                    data={coursePackages.data}
                    lastElemRef={lastElemRef}
                    slideSize={648}
                    breakpoints={[{ maxWidth: "sm", slideSize: "100%" }]}>
                    {(props) => (
                        <CoursePackageCard {...props} mih={420} w="100%">
                            {(props) => <CourseListFromPackage {...props} />}
                        </CoursePackageCard>
                    )}
                </Carousel>
            </Skeleton>
        </Box>
    );
};

export default CarouselList;
