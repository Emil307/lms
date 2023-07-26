import { Divider, ThemeIcon } from "@mantine/core";
import React, { ChangeEvent } from "react";
import { Edit3, Trash } from "react-feather";
import { closeModal, openModal } from "@mantine/modals";
import { MenuDataGrid, MenuItemDataGrid, Switch } from "@shared/ui";
import { CourseModuleWithoutLessons, useUpdateCourseModuleActivity } from "@entities/courseModule";
import { DeleteCourseModuleModal, UpdateCourseModuleModal } from "@features/courseModules";

export interface ListMenuProps {
    courseId: string;
    moduleNumber: number;
    data: CourseModuleWithoutLessons;
}

const ListMenu = ({ courseId, moduleNumber, data }: ListMenuProps) => {
    const moduleId = String(data.id);
    const { mutate: updateActivityStatus } = useUpdateCourseModuleActivity({ courseId, moduleId, moduleName: data.name });

    const handleChangeActiveStatus = (newValue: ChangeEvent<HTMLInputElement>) => updateActivityStatus(newValue.target.checked);

    const handleCloseUpdateModuleModal = () => closeModal("UPDATE_COURSE_MODULE");
    const onCloseDeleteModuleModal = () => closeModal("DELETE_COURSE_MODULE");

    const handleOpenUpdateModuleModal = () => {
        openModal({
            modalId: "UPDATE_COURSE_MODULE",
            title: "Редактирование модуля",
            centered: true,
            children: (
                <UpdateCourseModuleModal
                    courseId={courseId}
                    module={data}
                    moduleNumber={moduleNumber}
                    onClose={handleCloseUpdateModuleModal}
                />
            ),
        });
    };

    const handleOpenDeleteModuleModal = () => {
        openModal({
            modalId: "DELETE_COURSE_MODULE",
            title: "Удаление модуля",
            centered: true,
            children: (
                <DeleteCourseModuleModal
                    courseId={courseId}
                    moduleId={moduleId}
                    moduleName={data.name}
                    onClose={onCloseDeleteModuleModal}
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
            <MenuItemDataGrid onClick={handleOpenUpdateModuleModal}>
                <ThemeIcon w={16} h={16} color="primary" variant="outline" sx={{ border: "none" }}>
                    <Edit3 />
                </ThemeIcon>
                Редактировать
            </MenuItemDataGrid>
            <MenuItemDataGrid onClick={handleOpenDeleteModuleModal}>
                <ThemeIcon w={16} h={16} color="primary" variant="outline" sx={{ border: "none" }}>
                    <Trash />
                </ThemeIcon>
                Удалить
            </MenuItemDataGrid>
        </MenuDataGrid>
    );
};

export default ListMenu;
