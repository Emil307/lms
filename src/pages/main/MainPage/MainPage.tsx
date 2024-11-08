import { Box } from "@mantine/core";
import React from "react";
import { MainBanner } from "@widgets/mainBanner";
import { CourseCollectionsBlock, AdvantagesBlock, CoursesBlock, FaqBlock, CourseReviewsBlock } from "./components";
import TGBannerBlock from "./components/TGBanner/TGBannerBlock";

const MainPage = () => {
    return (
        <Box>
            <MainBanner />
            <CoursesBlock mt={{ base: 88, sm: 112 }} />
            <CourseCollectionsBlock mt={{ base: 120, sm: 160 }} />
            <AdvantagesBlock my={64} />
            <CourseReviewsBlock mt={64} />
            <TGBannerBlock mt={112} />
            <FaqBlock mt={112} />
        </Box>
    );
};

export default MainPage;
