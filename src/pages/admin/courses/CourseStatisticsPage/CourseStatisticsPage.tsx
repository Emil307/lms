import { Box, Text } from "@mantine/core";
import React from "react";
import { useRouter } from "next/router";
import { BreadCrumbs, Heading, Loader } from "@shared/ui";
import { CourseStatistics } from "@widgets/admin/courses";
import { TRouterQueries } from "@shared/types";
import { useAdminCourse } from "@entities/course";
import { getBreadCrumbsItems } from "./utils";

const CourseStatisticsPage = () => {
    const router = useRouter();
    const { id } = router.query as TRouterQueries;

    const { data: courseData, isLoading, isError } = useAdminCourse(id);

    if (!router.isReady || isLoading) {
        return <Loader />;
    }

    if (isError) {
        return <Text>Произошла ошибка, попробуйте позднее</Text>;
    }

    return (
        <Box>
            <BreadCrumbs items={getBreadCrumbsItems({ courseName: courseData.name, courseId: courseData.id })} mb={8} />
            <Heading>Статистика</Heading>
            <CourseStatistics courseId={id} />
        </Box>
    );
};

export default CourseStatisticsPage;
