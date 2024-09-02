import { Divider, ThemeIcon } from "@mantine/core";
import { MRT_Row } from "mantine-react-table";
import React, { ChangeEvent } from "react";
import { Edit3, Eye, Trash } from "react-feather";
import { closeModal, openModal } from "@mantine/modals";
import { useRouter } from "next/router";
import { useUserRole } from "@entities/auth";
import { MenuDataGrid, MenuItemDataGrid, Switch } from "@shared/ui";
import { AdminArticleFromList, useUpdateArticleActivity } from "@entities/article";
import { DeleteCourseArticleModal } from "@features/courses";
import { Roles } from "@shared/types";

interface ListMenuProps {
    row: MRT_Row<AdminArticleFromList>;
    courseId: string;
}

const ListMenu = ({ row, courseId }: ListMenuProps) => {
    const router = useRouter();

    const userRole = useUserRole();

    const { mutate: updateActivityStatus } = useUpdateArticleActivity({ id: String(row.original.id), name: row.original.name });

    const labelActivitySwitch = row.original.isActive ? "Деактивировать" : "Активировать";

    const handleChangeActivityStatus = (newValue: ChangeEvent<HTMLInputElement>) => {
        updateActivityStatus({ isActive: newValue.target.checked });
    };

    const handleCloseDeleteModal = () => closeModal("DELETE_COURSE_ARTICLE");

    const handleOpenDeleteModal = () => {
        openModal({
            modalId: "DELETE_COURSE_ARTICLE",
            title: "Удаление статьи",
            children: (
                <DeleteCourseArticleModal
                    id={row.original.id}
                    name={row.original.name}
                    courseId={courseId}
                    onClose={handleCloseDeleteModal}
                />
            ),
        });
    };

    const handleOpenArticleDetailsPage = () => {
        router.push({ pathname: "/admin/articles/[id]", query: { id: String(row.original.id) } });
    };

    const handleOpenUpdateArticlePage = () => {
        router.push({ pathname: "/admin/articles/[id]/edit", query: { id: String(row.original.id) } });
    };

    if (userRole?.name === Roles.teacher) {
        return null;
    }

    return (
        <MenuDataGrid>
            <MenuItemDataGrid closeMenuOnClick={false} py={4}>
                <Switch
                    variant="secondary"
                    checked={row.original.isActive}
                    label={labelActivitySwitch}
                    labelPosition="left"
                    onChange={handleChangeActivityStatus}
                    w="100%"
                />
            </MenuItemDataGrid>
            <Divider size={1} color="light" mx={12} />
            <MenuItemDataGrid mt={8} onClick={handleOpenArticleDetailsPage}>
                <ThemeIcon w={16} h={16} color="primary">
                    <Eye />
                </ThemeIcon>
                Открыть
            </MenuItemDataGrid>
            <MenuItemDataGrid onClick={handleOpenUpdateArticlePage}>
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
        </MenuDataGrid>
    );
};

export default ListMenu;
