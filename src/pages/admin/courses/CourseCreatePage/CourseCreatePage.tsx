import { Box, Title } from "@mantine/core";
import React from "react";
import { BreadCrumbs } from "@shared/ui";
import { breadCrumbsItems } from "./constants";
import { CreateCourseForm } from "@features/courses/ui";
import { useRouter } from "next/router";

const CourseCreatePage = () => {
    const router = useRouter();

    const onSuccess = (courseId: number) => {
        router.push({ pathname: "/admin/courses/[id]", query: { id: courseId.toString() } });
    };

    const onCancel = () => {
        router.push("/admin/courses");
    };

    return (
        <Box>
            <BreadCrumbs items={breadCrumbsItems} mb={8} />
            <Title order={1} color="dark">
                Создание курса
            </Title>
            <CreateCourseForm onSuccess={onSuccess} onCancel={onCancel} />
        </Box>
    );
};

export default CourseCreatePage;