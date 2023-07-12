import { Box, Flex } from "@mantine/core";
import React from "react";
import { PlusCircle } from "react-feather";
import { closeModal, openModal } from "@mantine/modals";
import { Button, Heading } from "@shared/ui";
import { LessonList } from "@widgets/admin/lessons";
import { CreateLessonModal } from "@features/lessons";

const LessonListPage = () => {
    const handleCloseCreateLessonModal = () => closeModal("CREATE_LESSON");

    const handleOpenCreateLessonModal = () => {
        openModal({
            modalId: "CREATE_LESSON",
            title: "Создание урока",
            centered: true,
            children: <CreateLessonModal onClose={handleCloseCreateLessonModal} />,
        });
    };

    return (
        <Box>
            <Flex align="center" justify="space-between">
                <Heading>Уроки</Heading>
                <Button variant="secondary" size="large" onClick={handleOpenCreateLessonModal} leftIcon={<PlusCircle />}>
                    Создать урок
                </Button>
            </Flex>
            <LessonList />
        </Box>
    );
};

export default LessonListPage;
