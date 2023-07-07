import { Box, Flex, ThemeIcon, Title } from "@mantine/core";
import React from "react";
import { Folder } from "react-feather";
import { BreadCrumbs } from "@shared/ui";
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
                    <Title order={1} color="dark" sx={{ display: "flex", gap: 12, alignItems: "center" }}>
                        <ThemeIcon color="primaryHover" variant="outline" sx={{ border: "none" }}>
                            <Folder />
                        </ThemeIcon>
                        Курсы
                    </Title>
                }>
                <Flex direction="column" gap={64} w="100%">
                    <CoursesList colProps={{ sm: 6 }} withPagination />
                    <Flex direction="column" gap={32}>
                        <Title color="dark" order={2}>
                            {titleCourseCollections}
                        </Title>
                        <CourseCollectionList perPage={3} hasCardMore colProps={{ sm: 6, xs: 12 }} />
                    </Flex>
                </Flex>
            </Filters>
        </Box>
    );
};

export default CoursesPage;
