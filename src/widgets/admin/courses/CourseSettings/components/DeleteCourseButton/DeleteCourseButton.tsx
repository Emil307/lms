import { ActionIcon } from "@mantine/core";
import { closeModal, openModal } from "@mantine/modals";
import React from "react";
import { Trash as TrashIcon } from "react-feather";
import { useRouter } from "next/router";
import { Button } from "@shared/ui";
import { DeleteCourseModal } from "@features/courses";
import { useMedia } from "@shared/utils";

interface DeleteCourseButtonProps {
    courseId: string;
    courseName: string;
}

const DeleteCourseButton = ({ courseId, courseName }: DeleteCourseButtonProps) => {
    const router = useRouter();
    const isMobile = useMedia("sm");

    const closeDeleteCourseModal = () => closeModal("DELETE_COURSE");

    const handleCancelDeleteCourse = () => closeDeleteCourseModal();

    const handleSuccessDeleteCourse = () => {
        closeDeleteCourseModal();
        router.push("/admin/courses");
    };

    const handleOpenDeleteModal = () => {
        openModal({
            modalId: "DELETE_COURSE",
            title: "Удаление курса",
            children: (
                <DeleteCourseModal
                    id={courseId}
                    name={courseName}
                    onCancel={handleCancelDeleteCourse}
                    onSuccess={handleSuccessDeleteCourse}
                />
            ),
        });
    };

    if (isMobile) {
        return (
            <ActionIcon color="dark" onClick={handleOpenDeleteModal}>
                <TrashIcon />
            </ActionIcon>
        );
    }

    return (
        <Button onClick={handleOpenDeleteModal} variant="text" leftIcon={<TrashIcon />}>
            Удалить курс
        </Button>
    );
};

export default DeleteCourseButton;
