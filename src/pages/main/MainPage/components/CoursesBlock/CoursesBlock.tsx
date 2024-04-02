import { Box, Flex, FlexProps } from "@mantine/core";
import React, { useMemo } from "react";
import { Folder } from "react-feather";
import { useRouter } from "next/router";
import { List as CoursesList } from "@features/courses";
import { Button, Heading, Paragraph } from "@shared/ui";
import { useCourseResources } from "@entities/course";
import { FilterTypes } from "@shared/constant";
import { useIntersection } from "@shared/utils";
import useStyles from "./CoursesBlock.styles";

export interface CoursesBlockProps extends FlexProps {}

const CoursesBlock = (props: CoursesBlockProps) => {
    const router = useRouter();
    const { classes } = useStyles();
    const { ref: rootBlockRef, entry } = useIntersection();

    const courseResources = useCourseResources({ type: FilterTypes.SELECT }, !!entry?.isIntersecting);

    const handleOpenCoursesPage = () => router.push("/courses");

    const renderCategories = useMemo(() => {
        if (!courseResources.data?.categories.length) {
            return null;
        }

        return (
            <Flex className={classes.wrapperCategoryList}>
                {courseResources.data.categories.map((category) => {
                    const handleClick = () => router.push({ pathname: "/courses", query: { categoryId: category.id.toString() } });
                    return (
                        <Paragraph variant="text-small-semi" key={category.id} className={classes.category} onClick={handleClick}>
                            {category.name}
                        </Paragraph>
                    );
                })}
            </Flex>
        );
    }, [courseResources]);

    return (
        <Box ref={rootBlockRef}>
            <CoursesList
                colProps={{ lg: 4, md: 4, xs: 6 }}
                perPage={6}
                isPopular
                headerSlot={
                    <Flex direction="column" gap={32}>
                        <Heading>Популярные курсы</Heading>
                        {renderCategories}
                    </Flex>
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
