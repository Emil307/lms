import { Box, Flex, Title } from "@mantine/core";
import React from "react";
import { PlusCircle } from "react-feather";
import { useRouter } from "next/router";
import { Button } from "@shared/ui";
import { AdminList as AdminCourseCollectionList } from "@features/courseCollections";

const CourseCollectionsPage = () => {
    const router = useRouter();

    const openCreateCourseCollectionForm = () => router.push("/admin/settings/course-collections/create");

    return (
        <Box>
            <Flex align="center" justify="space-between" mb={24}>
                <Title order={1} color="dark">
                    Подборки курсов
                </Title>
                <Button variant="secondary" size="large" leftIcon={<PlusCircle />} onClick={openCreateCourseCollectionForm}>
                    Создать подборку
                </Button>
            </Flex>
            <AdminCourseCollectionList />
        </Box>
    );
};

export default CourseCollectionsPage;
