import { Box, Title } from "@mantine/core";
import React from "react";
import { AdminList as AdminCourseReviewList } from "@features/courseReviews";

const CourseReviewsPage = () => {
    return (
        <Box>
            <Title order={1} color="dark" mb={24}>
                Отзывы
            </Title>
            <AdminCourseReviewList />
        </Box>
    );
};

export default CourseReviewsPage;
