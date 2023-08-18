import { useMediaQuery } from "@mantine/hooks";
import { ActionIcon } from "@mantine/core";
import { closeModal, openModal } from "@mantine/modals";
import React from "react";
import { Trash as TrashIcon } from "react-feather";
import { useRouter } from "next/router";
import { DeleteLessonModal } from "@features/lessons";
import { Button } from "@shared/ui";

interface DeleteLessonButtonProps {
    lessonId: string;
    lessonName: string;
}

const DeleteLessonButton = ({ lessonId, lessonName }: DeleteLessonButtonProps) => {
    const router = useRouter();
    const isMobile = useMediaQuery("(max-width: 744px)");

    const closeDeleteLessonModal = () => closeModal("DELETE_LESSON");

    const handleCancelDeleteLesson = () => closeDeleteLessonModal();

    const handleSuccessDeleteLesson = () => {
        closeDeleteLessonModal();
        router.push("/admin/lessons");
    };

    const handleOpenDeleteLessonModal = () => {
        openModal({
            modalId: "DELETE_LESSON",
            title: "Удаление урока",
            children: (
                <DeleteLessonModal
                    id={lessonId}
                    name={lessonName}
                    onSuccess={handleSuccessDeleteLesson}
                    onCancel={handleCancelDeleteLesson}
                />
            ),
        });
    };

    if (isMobile) {
        return (
            <ActionIcon color="dark" onClick={handleOpenDeleteLessonModal}>
                <TrashIcon />
            </ActionIcon>
        );
    }

    return (
        <Button onClick={handleOpenDeleteLessonModal} variant="text" leftIcon={<TrashIcon />}>
            Удалить урок
        </Button>
    );
};

export default DeleteLessonButton;