import { Box } from "@mantine/core";
import React from "react";
import { MainBanner } from "@widgets/mainBanner";
import {
    AdvantagesBlock,
    CoursePackagesBlock,
    CourseCollectionsBlock,
    CoursesBlock,
    FaqBlock,
    StaticReviewsBlock,
    TeachersBlock,
    CourseReviewsBlock,
} from "./components";

const MainPage = () => {
    return (
        <Box>
            <MainBanner />
            <AdvantagesBlock mt={24} />
            <CourseCollectionsBlock mt={64} />
            <CoursesBlock mt={64} />
            <StaticReviewsBlock mt={64} />
            <CourseReviewsBlock mt={64} />
            <CoursePackagesBlock mt={64} />
            <TeachersBlock mt={64} />
            <FaqBlock mt={64} />
        </Box>
    );
};

export default MainPage;
