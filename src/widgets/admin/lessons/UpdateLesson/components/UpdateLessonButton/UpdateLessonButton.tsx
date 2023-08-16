import { useMediaQuery } from "@mantine/hooks";
import { ActionIcon } from "@mantine/core";
import { closeModal, openModal } from "@mantine/modals";
import React from "react";
import { UpdateLessonModal } from "@features/lessons";
import { Button } from "@shared/ui";
import { Edit3 as EditIcon } from "react-feather";
import useStyles from "./UpdateLessonButton.styles";
import { AdminLesson } from "@entities/lesson";

interface UpdateLessonButtonProps {
    data: AdminLesson;
}

const UpdateLessonButton = ({ data }: UpdateLessonButtonProps) => {
    const { classes } = useStyles();

    const isMobile = useMediaQuery("(max-width: 744px)");

    const closeUpdateLessonModal = () => closeModal("UPDATE_LESSON");

    const handleCloseUpdateLessonModal = () => closeUpdateLessonModal();

    const handleOpenUpdateLessonModal = () => {
        openModal({
            modalId: "UPDATE_LESSON",
            title: "Редактирование урока",
            children: <UpdateLessonModal data={data} onClose={handleCloseUpdateLessonModal} />,
        });
    };

    if (isMobile) {
        return (
            <ActionIcon color="dark" onClick={handleOpenUpdateLessonModal}>
                <EditIcon />
            </ActionIcon>
        );
    }

    return (
        <Button className={classes.button} variant="white" size="small" onClick={handleOpenUpdateLessonModal} leftIcon={<EditIcon />}>
            Редактировать
        </Button>
    );
};

export default UpdateLessonButton;
