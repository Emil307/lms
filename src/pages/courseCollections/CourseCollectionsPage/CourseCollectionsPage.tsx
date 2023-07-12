import { Box } from "@mantine/core";
import React from "react";
import { BreadCrumbs, Heading } from "@shared/ui";
import { List as CourseCollectionList } from "@features/courseCollections";
import { getBreadCrumbsItems } from "./utils";

const CourseCollectionsPage = () => {
    const title = `Топовые подборки курсов ${new Date().getFullYear()}`;

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 32 }}>
            <Box>
                <BreadCrumbs items={getBreadCrumbsItems({ title })} mb={8} />
                <Heading>{title}</Heading>
            </Box>
            <CourseCollectionList withPagination colProps={{ sm: 6, xs: 12 }} />
        </Box>
    );
};

export default CourseCollectionsPage;
