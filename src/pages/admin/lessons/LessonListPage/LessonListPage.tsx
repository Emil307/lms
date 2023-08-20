import { Box, Flex } from "@mantine/core";
import React from "react";
import { PlusCircle } from "react-feather";
import { closeModal, openModal } from "@mantine/modals";
import { Button, Heading } from "@shared/ui";
import { LessonList } from "@widgets/admin/lessons";
import { CreateLessonModal } from "@features/lessons";
import useStyles from "./LessonListPage.styles";
import { useMedia } from "@shared/utils";

const LessonListPage = () => {
    const { classes } = useStyles();
    const isTablet = useMedia("md");

    const handleCloseCreateLessonModal = () => closeModal("CREATE_LESSON");

    const handleOpenCreateLessonModal = () => {
        openModal({
            modalId: "CREATE_LESSON",
            title: "Создание урока",
            children: <CreateLessonModal onClose={handleCloseCreateLessonModal} />,
        });
    };

    return (
        <Box>
            <Flex className={classes.headingContainer}>
                <Heading>Уроки</Heading>
                <Button
                    variant="secondary"
                    size={isTablet ? "medium" : "large"}
                    onClick={handleOpenCreateLessonModal}
                    leftIcon={<PlusCircle />}>
                    Создать урок
                </Button>
            </Flex>
            <LessonList />
        </Box>
    );
};

export default LessonListPage;
