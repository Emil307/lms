import { Box, Text, Title } from "@mantine/core";
import React from "react";
import { useRouter } from "next/router";
import { BreadCrumbs, Loader } from "@shared/ui";
import { TRouterQueries } from "@shared/types";
import { useAdminCourse } from "@entities/course";
import { UpdateCourseForm } from "@features/courses";
import { getBreadCrumbsItems } from "./utils";

const UpdateCoursePage = () => {
    const router = useRouter();
    const { id } = router.query as TRouterQueries;

    const { data: courseData, isLoading, isError } = useAdminCourse(id);

    const goToCourseDetail = () => {
        router.push({ pathname: "/admin/courses/[id]", query: { id } });
    };

    const onSuccess = () => goToCourseDetail();
    const onCancel = () => goToCourseDetail();

    if (!router.isReady || isLoading) {
        return <Loader />;
    }

    if (isError) {
        return <Text>Произошла ошибка, попробуйте позднее</Text>;
    }

    return (
        <Box>
            <BreadCrumbs items={getBreadCrumbsItems({ courseId: courseData.id, courseName: courseData.name })} mb={8} />
            <Title order={1} color="dark">
                {courseData.name}
            </Title>
            <UpdateCourseForm data={courseData} onSuccess={onSuccess} onCancel={onCancel} />
        </Box>
    );
};

export default UpdateCoursePage;
