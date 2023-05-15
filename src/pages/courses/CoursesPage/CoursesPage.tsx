import { Box, Group, ThemeIcon, Title } from "@mantine/core";
import React from "react";
import { Folder } from "react-feather";
import { BreadCrumbs } from "@shared/ui";
import { List as CoursesList } from "@features/courses";
import { breadCrumbsItems } from "./constants";

const CoursesPage = () => {
    return (
        <Group sx={{ flexDirection: "column", alignItems: "flex-start", gap: 32 }}>
            <Box>
                <BreadCrumbs items={breadCrumbsItems} mb={8} />
                <Title order={1} color="dark" sx={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <ThemeIcon color="primaryHover" variant="outline" sx={{ border: "none" }}>
                        <Folder />
                    </ThemeIcon>
                    Курсы
                </Title>
            </Box>
            <CoursesList />
        </Group>
    );
};

export default CoursesPage;
