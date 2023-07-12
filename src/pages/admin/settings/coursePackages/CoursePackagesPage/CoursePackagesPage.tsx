import { Box, Flex } from "@mantine/core";
import React, { useState } from "react";
import { PlusCircle } from "react-feather";
import { useRouter } from "next/router";
import { Button, Heading, Prompt } from "@shared/ui";
import { AdminList as AdminCoursePackageList } from "@features/coursePackages";

const CoursePackagesPage = () => {
    const router = useRouter();
    const [openedPrompt, setOpenedPrompt] = useState(true);

    const openCreateCoursePackageForm = () => router.push("/admin/settings/course-packages/create");

    const handleClosePrompt = () => setOpenedPrompt(false);

    return (
        <Box>
            <Flex align="center" justify="space-between" mb={24}>
                <Heading>Пакеты курсов</Heading>
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
