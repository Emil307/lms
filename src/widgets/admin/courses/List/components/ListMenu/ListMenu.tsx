import { Divider, ThemeIcon } from "@mantine/core";
import { MRT_Row } from "mantine-react-table";
import React, { ChangeEvent } from "react";
import { Edit3, Eye, Trash } from "react-feather";
import { closeModal, openModal } from "@mantine/modals";
import { useRouter } from "next/router";
import { MenuDataGrid, MenuItemDataGrid, Switch } from "@shared/ui";
import { AdminCourseFromList, useUpdateCourseActivity } from "@entities/course";
import { DeleteCourseModal } from "@features/courses";
import { useUserRole } from "@entities/auth";
import { Roles } from "@shared/types";

interface ListMenuProps {
    row: MRT_Row<AdminCourseFromList>;
}

const ListMenu = ({ row }: ListMenuProps) => {
    const router = useRouter();
    const courseId = String(row.original.id);
    const { mutate: updateActivityStatus } = useUpdateCourseActivity({ id: String(row.original.id), name: row.original.name });

    const userRole = useUserRole();

    const labelActivitySwitch = row.original.isActive ? "Деактивировать" : "Активировать";

    const handleChangeActiveStatus = (newValue: ChangeEvent<HTMLInputElement>) =>
        updateActivityStatus({ isActive: newValue.target.checked });

    const handleGoToCoursePage = () => {
        router.push({ pathname: "/admin/courses/[id]", query: { id: courseId } });
    };

    const handleGoToUpdateCoursePage = () => {
        router.push({ pathname: "/admin/courses/[id]/edit", query: { id: courseId } });
    };

    const handleSuccessDeleteCourse = () => closeDeleteCourseModal();
    const handleCancelDeleteCourse = () => closeDeleteCourseModal();
    const closeDeleteCourseModal = () => closeModal("DELETE_COURSE");

    const handleOpenDeleteModal = () => {
        openModal({
            modalId: "DELETE_COURSE",
            title: "Удаление курса",
            children: (
                <DeleteCourseModal
                    id={courseId}
                    name={row.original.name}
                    onCancel={handleCancelDeleteCourse}
                    onSuccess={handleSuccessDeleteCourse}
                />
            ),
        });
    };

    const renderItems = () => {
        if (userRole?.name === Roles.teacher) {
            return (
                <MenuItemDataGrid onClick={handleGoToCoursePage}>
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
                        checked={row.original.isActive}
                        label={labelActivitySwitch}
                        labelPosition="left"
                        onChange={handleChangeActiveStatus}
                        w="100%"
                    />
                </MenuItemDataGrid>
                <Divider size={1} color="light" mx={12} />

                <MenuItemDataGrid mt={8} onClick={handleGoToCoursePage}>
                    <ThemeIcon w={16} h={16} color="primary">
                        <Eye />
                    </ThemeIcon>
                    Открыть
                </MenuItemDataGrid>

                <MenuItemDataGrid onClick={handleGoToUpdateCoursePage}>
                    <ThemeIcon w={16} h={16} color="primary">
                        <Edit3 />
                    </ThemeIcon>
                    Редактировать
                </MenuItemDataGrid>
                <MenuItemDataGrid onClick={handleOpenDeleteModal}>
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
