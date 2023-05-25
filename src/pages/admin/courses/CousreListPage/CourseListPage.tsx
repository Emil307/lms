import { Box, Flex, Title } from "@mantine/core";
import React from "react";
import { Button } from "@shared/ui";
import { AdminList as AdminCoursesList } from "@features/courses/ui";
import { PlusCircle } from "react-feather";
import { useRouter } from "next/router";

const CourseListPage = () => {
    const router = useRouter();
    const openCreateCourseForm = () => router.push({ pathname: "/admin/courses/create" });

    return (
        <Box>
            <Flex align="center" justify="space-between">
                <Title>Курсы</Title>
                <Button variant="secondary" size="large" onClick={openCreateCourseForm} leftIcon={<PlusCircle />}>
                    Создать курс
                </Button>
            </Flex>
            <AdminCoursesList />
        </Box>
    );
};

export default CourseListPage;
