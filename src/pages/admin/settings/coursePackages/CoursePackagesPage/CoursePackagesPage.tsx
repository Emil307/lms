import { Box, Flex, Title } from "@mantine/core";
import React, { useState } from "react";
import { PlusCircle } from "react-feather";
import { useRouter } from "next/router";
import { Button, Prompt } from "@shared/ui";
import { AdminList as AdminCoursePackageList } from "@features/coursePackages";

const CoursePackagesPage = () => {
    const router = useRouter();
    const [openedPrompt, setOpenedPrompt] = useState(true);

    const openCreateCoursePackageForm = () => router.push("/admin/settings/course-packages/create");

    const handleClosePrompt = () => setOpenedPrompt(false);

    return (
        <Box>
            <Flex align="center" justify="space-between" mb={24}>
                <Title order={1} color="dark">
                    Пакеты курсов
                </Title>
                <Button variant="secondary" size="large" leftIcon={<PlusCircle />} onClick={openCreateCoursePackageForm}>
                    Создать пакет
                </Button>
            </Flex>
            <Prompt
                isOpened={openedPrompt}
                content="Скидка на отдельный курс устанавливается в разделе Курсы."
                onClose={handleClosePrompt}
                mb={24}
            />
            <AdminCoursePackageList />
        </Box>
    );
};

export default CoursePackagesPage;
