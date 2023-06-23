import { Box } from "@mantine/core";
import React from "react";
import { MainBanner } from "@widgets/mainBanner";
import {
    AdvantagesBlock,
    CoursePackagesBlock,
    CourseSetsBlock,
    CoursesBlock,
    FaqBlock,
    StaticReviewsBlock,
    TeachersBlock,
} from "./components";

const MainPage = () => {
    return (
        <Box>
            <MainBanner />
            <AdvantagesBlock mt={24} />
            <CourseSetsBlock mt={64} />
            <CoursesBlock mt={64} />
            <StaticReviewsBlock mt={64} />
            {/* //TODO: Нет эндпоинта для получения списка отзывов  */}
            {/* <StudentReviews titleProps={{ order: 1 }} /> */}
            <CoursePackagesBlock mt={64} />
            <TeachersBlock mt={64} />
            <FaqBlock mt={64} />
        </Box>
    );
};

export default MainPage;
