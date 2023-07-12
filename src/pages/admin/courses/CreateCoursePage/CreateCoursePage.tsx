import { Box } from "@mantine/core";
import React from "react";
import { useRouter } from "next/router";
import { BreadCrumbs, Heading } from "@shared/ui";
import { CreateCourseForm } from "@features/courses/ui";
import { breadCrumbsItems } from "./constants";

const CreateCoursePage = () => {
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
            <Heading>Создание курса</Heading>
            <CreateCourseForm onSuccess={onSuccess} onCancel={onCancel} />
        </Box>
    );
};

export default CreateCoursePage;
