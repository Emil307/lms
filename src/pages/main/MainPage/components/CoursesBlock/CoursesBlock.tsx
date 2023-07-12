import { Box, Flex, FlexProps, Text } from "@mantine/core";
import React, { useMemo } from "react";
import { Folder } from "react-feather";
import { useRouter } from "next/router";
import { useIntersection } from "@mantine/hooks";
import { List as CoursesList } from "@features/courses";
import { Button, Heading } from "@shared/ui";
import { useCourseResources } from "@entities/course";
import useStyles from "./CoursesBlock.styles";

export interface CoursesBlockProps extends FlexProps {}

const CoursesBlock = (props: CoursesBlockProps) => {
    const router = useRouter();
    const { classes } = useStyles();
    const { ref: rootBlockRef, entry } = useIntersection();

    const courseResources = useCourseResources(!!(entry && entry.isIntersecting));

    const handleOpenCoursesPage = () => router.push("/courses");

    const renderCategories = useMemo(
        () =>
            courseResources.data?.categories.map((category) => {
                const handleClick = () => router.push({ pathname: "/courses", query: { categoryId: category.id.toString() } });
                return (
                    <Text key={category.id} className={classes.category} onClick={handleClick}>
                        {category.name}
                    </Text>
                );
            }),
        [courseResources]
    );

    return (
        <Box ref={rootBlockRef}>
            <CoursesList
                colProps={{ lg: 4, md: 4, sm: 6 }}
                perPage={6}
                headerSlot={
                    <>
                        <Heading mb={32}>Популярные курсы</Heading>
                        <Flex gap={8} wrap="wrap">
                            {renderCategories}
                        </Flex>
                    </>
                }
                footerSlot={
                    <Button variant="white" leftIcon={<Folder />} w="min-content" mx="auto" onClick={handleOpenCoursesPage}>
                        Смотреть все курсы
                    </Button>
                }
                skeletonListProps={{
                    mih: 258,
                    radius: 16,
                }}
                visible={!!entry?.isIntersecting}
                wrapperProps={{ direction: "column", gap: 32, ...props }}
            />
        </Box>
    );
};

export default CoursesBlock;
