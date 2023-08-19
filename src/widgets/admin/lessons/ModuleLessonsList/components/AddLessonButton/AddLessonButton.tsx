import { useMediaQuery } from "@mantine/hooks";
import { ActionIcon } from "@mantine/core";
import { closeModal, openModal } from "@mantine/modals";
import React from "react";
import { PlusCircle as PlusCircleIcon } from "react-feather";
import { Button } from "@shared/ui";
import { CreateLessonModal, LessonListModal, SelectLessonOptionModal } from "@features/lessons";
import { CourseModule } from "@entities/courseModule";

interface AddLessonButtonProps {
    courseId: string;
    module: CourseModule;
}

const AddLessonButton = ({ courseId, module }: AddLessonButtonProps) => {
    const moduleId = String(module.id);

    const isMobile = useMediaQuery("(max-width: 744px)");

    const handleCloseLessonListModal = () => closeModal("LESSON_LIST");
    const handleCloseCreateLessonModal = () => closeModal("CREATE_LESSON");

    const handleOpenSelectLessonOptionModal = () => {
        openModal({
            modalId: "SELECT_LESSON_OPTION",
            title: "Добавить урок",
            size: 912,
            children: <SelectLessonOptionModal onCreate={handleOpenCreateLessonModal} onSelect={handleOpenSelectLessonsModal} />,
        });
    };

    const handleOpenCreateLessonModal = () => {
        openModal({
            modalId: "CREATE_LESSON",
            title: "Создание урока",
            children: (
                <CreateLessonModal
                    courseId={courseId}
                    lessonNumber={module.lessons.length + 1}
                    moduleId={moduleId}
                    moduleName={module.name}
                    onClose={handleCloseCreateLessonModal}
                />
            ),
        });
    };

    const handleOpenSelectLessonsModal = () => {
        openModal({
            modalId: "LESSON_LIST",
            title: "Выбрать из базы уроков",
            size: 912,
            mah: 912,
            children: (
                <LessonListModal courseId={courseId} moduleId={moduleId} moduleName={module.name} onClose={handleCloseLessonListModal} />
            ),
        });
    };

    if (isMobile) {
        return (
            <ActionIcon color="dark" onClick={handleOpenSelectLessonOptionModal}>
                <PlusCircleIcon />
            </ActionIcon>
        );
    }

    return (
        <Button onClick={handleOpenSelectLessonOptionModal} variant="text" leftIcon={<PlusCircleIcon />}>
            Добавить урок
        </Button>
    );
};

export default AddLessonButton;
