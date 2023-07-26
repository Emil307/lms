import { Divider, ThemeIcon } from "@mantine/core";
import React, { ChangeEvent } from "react";
import { Edit3, Trash } from "react-feather";
import { closeModal, openModal } from "@mantine/modals";
import { MenuDataGrid, MenuItemDataGrid, Switch } from "@shared/ui";
import { useUpdateLessonActivity } from "@entities/lesson";
import { DetachLessonFromCourseModuleModal } from "@features/courseModules";
import { UpdateLessonModal } from "@features/lessons";
import { CourseModuleLesson } from "@entities/courseModule";

export interface ListMenuProps {
    courseId: string;
    moduleId: string;
    moduleName: string;
    lessonNumber: number;
    data: CourseModuleLesson;
}

const ListMenu = ({ courseId, moduleId, moduleName, lessonNumber, data }: ListMenuProps) => {
    const lessonId = String(data.id);
    const { mutate: updateActivityStatus } = useUpdateLessonActivity({ id: lessonId, moduleId, lessonName: data.name });

    const handleChangeActiveStatus = (newValue: ChangeEvent<HTMLInputElement>) => updateActivityStatus(newValue.target.checked);

    const handleCloseUpdateLessonModal = () => closeModal("UPDATE_LESSON");
    const onCloseDeleteLessonFromModuleModal = () => closeModal("DELETE_LESSON_FROM_MODULE");

    const handleOpenUpdateLessonModal = () => {
        openModal({
            modalId: "UPDATE_LESSON",
            title: "Редактирование урока",
            centered: true,
            children: <UpdateLessonModal data={data} lessonNumber={lessonNumber} onClose={handleCloseUpdateLessonModal} />,
        });
    };

    const handleOpenDeleteLessonFromModuleModal = () => {
        openModal({
            modalId: "DELETE_LESSON_FROM_MODULE",
            title: "Удаление урока",
            centered: true,
            children: (
                <DetachLessonFromCourseModuleModal
                    courseId={courseId}
                    moduleId={moduleId}
                    moduleName={moduleName}
                    lessonId={lessonId}
                    lessonName={data.name}
                    onClose={onCloseDeleteLessonFromModuleModal}
                />
            ),
        });
    };

    const labelActivitySwitch = data.isActive ? "Деактивировать" : "Активировать";

    return (
        <MenuDataGrid>
            <MenuItemDataGrid closeMenuOnClick={false}>
                <Switch
                    variant="secondary"
                    checked={data.isActive}
                    label={labelActivitySwitch}
                    labelPosition="left"
                    onChange={handleChangeActiveStatus}
                />
            </MenuItemDataGrid>
            <Divider size={1} color="light" mx={12} />
            <MenuItemDataGrid onClick={handleOpenUpdateLessonModal}>
                <ThemeIcon w={16} h={16} color="primary" variant="outline" sx={{ border: "none" }}>
                    <Edit3 />
                </ThemeIcon>
                Редактировать
            </MenuItemDataGrid>
            <MenuItemDataGrid onClick={handleOpenDeleteLessonFromModuleModal}>
                <ThemeIcon w={16} h={16} color="primary" variant="outline" sx={{ border: "none" }}>
                    <Trash />
                </ThemeIcon>
                Удалить
            </MenuItemDataGrid>
        </MenuDataGrid>
    );
};

export default ListMenu;
