import { Box, Flex } from "@mantine/core";
import React from "react";
import { PlusCircle } from "react-feather";
import { closeModal, openModal } from "@mantine/modals";
import { Button, Heading } from "@shared/ui";
import { useUserRole } from "@entities/auth";
import { Roles } from "@app/routes";
import { LessonList } from "@widgets/admin/lessons";
import { CreateLessonModal } from "@features/lessons";
import { useMedia } from "@shared/utils";
import useStyles from "./LessonListPage.styles";

const LessonListPage = () => {
    const { classes } = useStyles();
    const isTablet = useMedia("md");

    const userRole = useUserRole();

    const handleCloseCreateLessonModal = () => closeModal("CREATE_LESSON");

    const handleOpenCreateLessonModal = () => {
        openModal({
            modalId: "CREATE_LESSON",
            title: "Создание урока",
            children: <CreateLessonModal onSuccess={handleCloseCreateLessonModal} onClose={handleCloseCreateLessonModal} />,
        });
    };

    return (
        <Box>
            <Flex className={classes.headingContainer}>
                <Heading>Уроки</Heading>

                {userRole && userRole !== Roles.teacher && (
                    <Button
                        variant="secondary"
                        size={isTablet ? "medium" : "large"}
                        onClick={handleOpenCreateLessonModal}
                        leftIcon={<PlusCircle />}>
                        Создать урок
                    </Button>
                )}
            </Flex>
            <LessonList />
        </Box>
    );
};

export default LessonListPage;
