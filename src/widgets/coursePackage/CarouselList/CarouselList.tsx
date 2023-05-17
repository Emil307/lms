import { Box, BoxProps, Flex, Title, Text, TitleProps } from "@mantine/core";
import { useEffect } from "react";
import { useIntersection } from "@mantine/hooks";
import { Carousel } from "@components/Carousel";
import { CoursePackage, useCoursePackages } from "@entities/coursePackage";
import { CourseListFromPackage, CoursePackageCard } from "@features/coursePackages";
import useStyles from "./CarouselList.styles";

export interface CarouselListProps extends Omit<BoxProps, "children"> {
    title: string;
    titleProps?: TitleProps;
    description?: string;
}

const CarouselList = ({ title, description, titleProps, ...props }: CarouselListProps) => {
    const { classes } = useStyles();

    //TODO: Добавить возможность фильтрации на исключение одного пакета
    const { data: coursePackages, hasNextPage, fetchNextPage } = useCoursePackages();
    const { ref: lastElemRef, entry } = useIntersection();

    useEffect(() => {
        if (entry?.isIntersecting && hasNextPage) {
            fetchNextPage();
        }
    }, [entry]);

    return (
        <Box {...props} className={classes.root}>
            <Flex direction="column" gap={8} mb={32}>
                <Title order={2} color="dark" {...titleProps}>
                    {title}
                </Title>
                {description && <Text className={classes.headingDescription}>{description}</Text>}
            </Flex>
            <Carousel<CoursePackage> data={coursePackages?.data} lastElemRef={lastElemRef} slideSize={648}>
                {(props) => (
                    <CoursePackageCard {...props} h={420} w={648}>
                        {(props) => <CourseListFromPackage {...props} />}
                    </CoursePackageCard>
                )}
            </Carousel>
        </Box>
    );
};

export default CarouselList;
