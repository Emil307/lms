import { ActionIcon } from "@mantine/core";
import { closeModal, openModal } from "@mantine/modals";
import React from "react";
import { Edit3 as EditIcon } from "react-feather";
import { UpdateLessonModal } from "@features/lessons";
import { Button } from "@shared/ui";
import { AdminLesson } from "@entities/lesson";
import { useMedia } from "@shared/utils";
import useStyles from "./UpdateLessonButton.styles";

interface UpdateLessonButtonProps {
    data: AdminLesson;
}

const UpdateLessonButton = ({ data }: UpdateLessonButtonProps) => {
    const { classes } = useStyles();

    const isMobile = useMedia("sm");

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
