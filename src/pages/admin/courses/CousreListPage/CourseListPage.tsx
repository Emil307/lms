import { Box, Flex } from "@mantine/core";
import React from "react";
import { PlusCircle } from "react-feather";
import { useRouter } from "next/router";
import { Button, Heading } from "@shared/ui";
import { CourseList } from "@widgets/admin/courses";

const CourseListPage = () => {
    const router = useRouter();
    const openCreateCourseForm = () => router.push({ pathname: "/admin/courses/create" });

    return (
        <Box>
            <Flex align="center" justify="space-between">
                <Heading>Курсы</Heading>
                <Button variant="secondary" size="large" onClick={openCreateCourseForm} leftIcon={<PlusCircle />}>
                    Создать курс
                </Button>
            </Flex>
            <CourseList />
        </Box>
    );
};

export default CourseListPage;
