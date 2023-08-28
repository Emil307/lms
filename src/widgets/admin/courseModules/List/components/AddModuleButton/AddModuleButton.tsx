import { ActionIcon } from "@mantine/core";
import { closeModal, openModal } from "@mantine/modals";
import React from "react";
import { PlusCircle as PlusCircleIcon } from "react-feather";
import { Button } from "@shared/ui";
import { CreateCourseModuleModal } from "@features/courseModules";
import { useMedia } from "@shared/utils";

interface AddModuleButtonProps {
    courseId: string;
    moduleNumber: number;
    hidden?: boolean;
}

const AddModuleButton = ({ courseId, moduleNumber, hidden }: AddModuleButtonProps) => {
    const isMobile = useMedia("sm");

    const handleCloseCreateModuleModal = () => closeModal("CREATE_COURSE_MODULE");

    const handleOpenCreateModuleModal = () => {
        openModal({
            modalId: "CREATE_COURSE_MODULE",
            title: "Создание модуля",
            children: <CreateCourseModuleModal courseId={courseId} moduleNumber={moduleNumber} onClose={handleCloseCreateModuleModal} />,
        });
    };

    if (hidden) {
        return null;
    }

    if (isMobile) {
        return (
            <ActionIcon color="dark" onClick={handleOpenCreateModuleModal}>
                <PlusCircleIcon />
            </ActionIcon>
        );
    }

    return (
        <Button onClick={handleOpenCreateModuleModal} variant="text" leftIcon={<PlusCircleIcon />}>
            Добавить модуль
        </Button>
    );
};

export default AddModuleButton;
