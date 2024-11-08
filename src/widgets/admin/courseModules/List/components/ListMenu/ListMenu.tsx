import { Divider, ThemeIcon } from "@mantine/core";
import React, { ChangeEvent } from "react";
import { Edit3, Eye, Trash } from "react-feather";
import { closeModal, openModal } from "@mantine/modals";
import { useRouter } from "next/router";
import { MenuDataGrid, MenuItemDataGrid, Switch } from "@shared/ui";
import { CourseModuleWithoutLessons, useUpdateCourseModuleActivity } from "@entities/courseModule";
import { DeleteCourseModuleModal, UpdateCourseModuleModal } from "@features/courseModules";
import { useMedia } from "@shared/utils";
import { useUserRole } from "@entities/auth";
import { Roles } from "@shared/types";

export interface ListMenuProps {
    courseId: string;
    moduleNumber: number;
    data: CourseModuleWithoutLessons;
}

const ListMenu = ({ courseId, moduleNumber, data }: ListMenuProps) => {
    const router = useRouter();
    const moduleId = String(data.id);
    const { mutate: updateActivityStatus } = useUpdateCourseModuleActivity({ courseId, moduleId, moduleName: data.name });

    const userRole = useUserRole();

    const isMobile = useMedia("sm");

    const handleChangeActiveStatus = (newValue: ChangeEvent<HTMLInputElement>) => updateActivityStatus(newValue.target.checked);

    const handleCloseUpdateModuleModal = () => closeModal("UPDATE_COURSE_MODULE");
    const onCloseDeleteModuleModal = () => closeModal("DELETE_COURSE_MODULE");

    const handleOpenUpdateModuleModal = () => {
        openModal({
            modalId: "UPDATE_COURSE_MODULE",
            title: "Редактирование модуля",
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

    const handleOpenModuleDetail = () => {
        router.push({ pathname: "/admin/courses/[id]/modules/[moduleId]", query: { id: courseId, moduleId } });
    };

    const labelActivitySwitch = data.isActive ? "Деактивировать" : "Активировать";

    const renderItems = () => {
        if (userRole?.name === Roles.teacher) {
            if (!isMobile) {
                return null;
            }
            return (
                <MenuItemDataGrid onClick={handleOpenModuleDetail}>
                    <ThemeIcon w={16} h={16} color="primary">
                        <Eye />
                    </ThemeIcon>
                    Открыть
                </MenuItemDataGrid>
            );
        }
        return (
            <>
                <MenuItemDataGrid closeMenuOnClick={false} py={4}>
                    <Switch
                        variant="secondary"
                        checked={data.isActive}
                        label={labelActivitySwitch}
                        labelPosition="left"
                        onChange={handleChangeActiveStatus}
                        w="100%"
                    />
                </MenuItemDataGrid>
                <Divider size={1} color="neutralGray100" mx={12} />

                {isMobile && (
                    <MenuItemDataGrid mt={8} mb={-8} onClick={handleOpenModuleDetail}>
                        <ThemeIcon w={16} h={16} color="primary">
                            <Eye />
                        </ThemeIcon>
                        Открыть
                    </MenuItemDataGrid>
                )}

                <MenuItemDataGrid mt={8} onClick={handleOpenUpdateModuleModal}>
                    <ThemeIcon w={16} h={16} color="primary">
                        <Edit3 />
                    </ThemeIcon>
                    Редактировать
                </MenuItemDataGrid>
                <MenuItemDataGrid onClick={handleOpenDeleteModuleModal}>
                    <ThemeIcon w={16} h={16} color="primary">
                        <Trash />
                    </ThemeIcon>
                    Удалить
                </MenuItemDataGrid>
            </>
        );
    };

    return <MenuDataGrid>{renderItems()}</MenuDataGrid>;
};

export default ListMenu;
