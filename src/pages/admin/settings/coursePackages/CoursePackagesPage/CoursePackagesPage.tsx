import { Box, Flex } from "@mantine/core";
import React, { useState } from "react";
import { PlusCircle } from "react-feather";
import { useRouter } from "next/router";
import { useMediaQuery } from "@mantine/hooks";
import { Button, Heading, Prompt } from "@shared/ui";
import { AdminList as AdminCoursePackageList } from "@features/coursePackages";
import useStyles from "./CoursePackagesPage.styles";

const CoursePackagesPage = () => {
    const router = useRouter();
    const [openedPrompt, setOpenedPrompt] = useState(true);

    const { classes } = useStyles();

    const isTablet = useMediaQuery("(max-width: 1024px)");

    const openCreateCoursePackageForm = () => router.push("/admin/settings/course-packages/create");

    const handleClosePrompt = () => setOpenedPrompt(false);

    return (
        <Box>
            <Flex className={classes.headingContainer}>
                <Heading>Пакеты курсов</Heading>
                <Button
                    variant="secondary"
                    size={isTablet ? "medium" : "large"}
                    leftIcon={<PlusCircle />}
                    onClick={openCreateCoursePackageForm}>
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
