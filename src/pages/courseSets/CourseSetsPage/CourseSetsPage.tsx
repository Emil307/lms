import { Box, Title } from "@mantine/core";
import React from "react";
import { BreadCrumbs } from "@shared/ui";
import { List as CourseSetList } from "@features/courseSets";
import { getBreadCrumbsItems } from "./utils";

const CourseSetsPage = () => {
    const title = `Топовые подборки курсов ${new Date().getFullYear()}`;

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 32 }}>
            <Box>
                <BreadCrumbs items={getBreadCrumbsItems({ title })} mb={8} />
                <Title order={1} color="dark">
                    {title}
                </Title>
            </Box>
            <CourseSetList withPagination colProps={{ sm: 6, xs: 12 }} />
        </Box>
    );
};

export default CourseSetsPage;
