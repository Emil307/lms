import { Box, Flex, ThemeIcon } from "@mantine/core";
import React from "react";
import { Folder } from "react-feather";
import { BreadCrumbs, Heading } from "@shared/ui";
import { List as CoursesList, Filters } from "@features/courses";
import { List as CourseCollectionList } from "@features/courseCollections";
import { breadCrumbsItems } from "./constants";

const CoursesPage = () => {
    const titleCourseCollections = `Топовые подборки курсов ${new Date().getFullYear()}`;

    return (
        <Filters
            title={
                <Box>
                    <BreadCrumbs items={breadCrumbsItems} mb={8} />
                    <Flex align="center" gap={12}>
                        <ThemeIcon color="primaryHover">
                            <Folder />
                        </ThemeIcon>
                        <Heading>Курсы</Heading>
                    </Flex>
                </Box>
            }>
            <Flex direction="column" gap={64} w="100%">
                <CoursesList colProps={{ sm: 6 }} withPagination />
                <CourseCollectionList
                    perPage={3}
                    title={titleCourseCollections}
                    hasCardMore
                    headingProps={{ order: 2, mb: 32 }}
                    colProps={{ sm: 6, xs: 12 }}
                />
            </Flex>
        </Filters>
    );
};

export default CoursesPage;
