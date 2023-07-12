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
        <Box>
            <BreadCrumbs items={breadCrumbsItems} mb={8} />
            <Filters
                title={
                    <Heading sx={{ display: "flex", gap: 12, alignItems: "center" }}>
                        <ThemeIcon color="primaryHover" variant="outline" sx={{ border: "none" }}>
                            <Folder />
                        </ThemeIcon>
                        Курсы
                    </Heading>
                }>
                <Flex direction="column" gap={64} w="100%">
                    <CoursesList colProps={{ sm: 6 }} withPagination />
                    <Flex direction="column" gap={32}>
                        <Heading order={2}>{titleCourseCollections}</Heading>
                        <CourseCollectionList perPage={3} hasCardMore colProps={{ sm: 6, xs: 12 }} />
                    </Flex>
                </Flex>
            </Filters>
        </Box>
    );
};

export default CoursesPage;
