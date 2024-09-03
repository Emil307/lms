import { Box } from "@mantine/core";
import React from "react";
import { MainBanner } from "@widgets/mainBanner";
import { CourseCollectionsBlock, AdvantagesBlock, CoursesBlock, FaqBlock, CourseReviewsBlock } from "./components";
import TGBannerBlock from "./components/TGBanner/TGBannerBlock";

const MainPage = () => {
    return (
        <Box>
            <MainBanner />
            <CoursesBlock mt={112} />
            <CourseCollectionsBlock mt={112} />
            <AdvantagesBlock my={64} />
            <CourseReviewsBlock mt={64} />
            <TGBannerBlock mt={112} />
            <FaqBlock mt={112} />
        </Box>
    );
};

export default MainPage;
