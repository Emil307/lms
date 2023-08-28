import { closeModal, openModal } from "@mantine/modals";
import { PlusCircle as PlusCircleIcon } from "react-feather";
import { ActionIcon } from "@mantine/core";
import React from "react";
import { SelectTypeMaterial } from "@widgets/admin/materials";
import { useAttachMaterialsToLesson } from "@entities/lesson";
import { AddMaterialsToLessonModal } from "@features/lessons";
import { Button, Loader } from "@shared/ui";
import { useMedia } from "@shared/utils";

interface AddMaterialsButtonProps {
    lessonId: string;
    hidden?: boolean;
}

const AddMaterialsButton = ({ lessonId, hidden }: AddMaterialsButtonProps) => {
    const { mutate: attachMaterialsToLesson, isLoading } = useAttachMaterialsToLesson({ lessonId });

    const isMobile = useMedia("sm");

    const handleCloseAddMaterialsToLessonModal = () => closeModal("ADD_MATERIALS_TO_LESSON");

    const handleSuccessLoadFiles = (fileIds: string[]) => {
        attachMaterialsToLesson(fileIds);
    };

    const handleOpenAddMaterialsToLessonModal = () => {
        openModal({
            modalId: "ADD_MATERIALS_TO_LESSON",
            title: "Выбрать из базы материалов",
            children: <AddMaterialsToLessonModal lessonId={lessonId} onClose={handleCloseAddMaterialsToLessonModal} />,
            size: 912,
        });
    };

    const handleOpenSelectMaterialsTypeModal = () => {
        openModal({
            modalId: "SELECT_MATERIALS_TYPE",
            title: "Добавить материалы",
            children: (
                <SelectTypeMaterial
                    description="Выберите способ загрузки материала"
                    onSuccessLoadFiles={handleSuccessLoadFiles}
                    onSelectFromBase={handleOpenAddMaterialsToLessonModal}
                />
            ),
            size: 912,
        });
    };

    if (hidden) {
        return null;
    }

    if (isMobile) {
        return (
            <ActionIcon color="dark" onClick={handleOpenSelectMaterialsTypeModal}>
                <PlusCircleIcon />
            </ActionIcon>
        );
    }

    return (
        <>
            <Loader overlay isLoading={isLoading} />
            <Button onClick={handleOpenSelectMaterialsTypeModal} variant="text" leftIcon={<PlusCircleIcon />}>
                Добавить материалы
            </Button>
        </>
    );
};

export default AddMaterialsButton;
