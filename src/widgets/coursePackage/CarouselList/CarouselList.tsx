import { Box, BoxProps, Flex, Text, TitleProps, Skeleton } from "@mantine/core";
import { useEffect } from "react";
import { useIntersection } from "@mantine/hooks";
import { Carousel } from "@components/Carousel";
import { CoursePackage, useCoursePackages } from "@entities/coursePackage";
import { CourseListFromPackage, Card as CoursePackageCard } from "@features/coursePackages";
import { Heading } from "@shared/ui";
import { adaptDataForUpdateAboutForm } from "./utils";
import useStyles from "./CarouselList.styles";

export interface CarouselListProps extends Omit<BoxProps, "children"> {
    title: string;
    titleProps?: TitleProps;
    description?: string;
    exceptionCoursePackageId?: string;
    visible?: boolean;
}

const CarouselList = ({ title, description, titleProps, exceptionCoursePackageId, visible, ...props }: CarouselListProps) => {
    const { classes } = useStyles();

    const {
        data: coursePackages,
        hasNextPage,
        fetchNextPage,
        isLoading,
    } = useCoursePackages(adaptDataForUpdateAboutForm({ exceptionCoursePackageId }), visible);
    const { ref: lastElemRef, entry } = useIntersection();

    useEffect(() => {
        if (entry.isIntersecting && hasNextPage) {
            fetchNextPage();
        }
    }, [entry]);

    if (!coursePackages?.data.length) {
        return null;
    }

    return (
        <Box {...props} className={classes.root}>
            <Flex direction="column" gap={8} mb={32}>
                <Skeleton visible={isLoading} mih={40} radius={24}>
                    <Heading order={2} {...titleProps}>
                        {title}
                    </Heading>
                </Skeleton>
                {description && <Text className={classes.headingDescription}>{description}</Text>}
            </Flex>
            <Skeleton visible={isLoading} mih={420} radius={16}>
                <Carousel<CoursePackage> data={coursePackages.data} lastElemRef={lastElemRef} slideSize={648}>
                    {(props) => (
                        <CoursePackageCard {...props} h={420} w={648}>
                            {(props) => <CourseListFromPackage {...props} />}
                        </CoursePackageCard>
                    )}
                </Carousel>
            </Skeleton>
        </Box>
    );
};

export default CarouselList;
