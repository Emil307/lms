import { Box } from "@mantine/core";
import React from "react";
import { AdminList as AdminCourseReviewList } from "@features/courseReviews";
import { Heading } from "@shared/ui";

const CourseReviewsPage = () => {
    return (
        <Box>
            <Heading mb={24}>Отзывы</Heading>
            <AdminCourseReviewList />
        </Box>
    );
};

export default CourseReviewsPage;
