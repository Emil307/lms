import { ActionIcon } from "@mantine/core";
import { closeAllModals, closeModal, openModal } from "@mantine/modals";
import React from "react";
import { PlusCircle as PlusCircleIcon } from "react-feather";
import { Button } from "@shared/ui";
import { CreateLessonModal, LessonListModal, SelectLessonOptionModal } from "@features/lessons";
import { CourseModule } from "@entities/courseModule";
import { useMedia } from "@shared/utils";

interface AddLessonButtonProps {
    courseId: string;
    module: CourseModule;
    hidden?: boolean;
}

const AddLessonButton = ({ courseId, module, hidden }: AddLessonButtonProps) => {
    const moduleId = String(module.id);

    const isMobile = useMedia("sm");

    const handleCloseLessonListModal = () => closeModal("LESSON_LIST");
    const handleCloseCreateLessonModal = () => closeModal("CREATE_LESSON");

    const handleSuccessAddLesson = () => closeAllModals();

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
                    onSuccess={handleSuccessAddLesson}
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
            styles: () => ({ modal: { height: 860 } }),
            children: (
                <LessonListModal
                    courseId={courseId}
                    moduleId={moduleId}
                    moduleName={module.name}
                    onSuccess={handleSuccessAddLesson}
                    onClose={handleCloseLessonListModal}
                />
            ),
        });
    };

    if (hidden) {
        return null;
    }

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
