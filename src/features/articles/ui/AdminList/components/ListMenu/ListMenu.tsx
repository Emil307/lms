import { Divider, ThemeIcon } from "@mantine/core";
import { MRT_Row } from "mantine-react-table";
import React, { ChangeEvent } from "react";
import { Edit3, Eye, Trash } from "react-feather";
import { closeModal, openModal } from "@mantine/modals";
import { useRouter } from "next/router";
import { MenuDataGrid, MenuItemDataGrid, Switch } from "@shared/ui";
import { useUserRole } from "@entities/auth";
import { AdminArticleFromList, useUpdateArticleActivity } from "@entities/article";
import { DeleteArticleModal } from "@features/articles";
import { Roles } from "@shared/types";

interface ListMenuProps {
    row: MRT_Row<AdminArticleFromList>;
}

const ListMenu = ({ row }: ListMenuProps) => {
    const router = useRouter();

    const userRole = useUserRole();

    const { mutate: updateActivityStatus } = useUpdateArticleActivity({ id: String(row.original.id), name: row.original.name });

    const labelActivitySwitch = row.original.isActive ? "Деактивировать" : "Активировать";

    const handleChangeActiveStatus = (newValue: ChangeEvent<HTMLInputElement>) =>
        updateActivityStatus({ isActive: newValue.target.checked });

    const handleCloseDeleteModal = () => closeModal("DELETE_ARTICLE");

    const openDeleteModal = () => {
        openModal({
            modalId: "DELETE_ARTICLE",
            title: "Удаление статьи",
            children: (
                <DeleteArticleModal
                    id={String(row.original.id)}
                    name={row.original.name}
                    onSuccess={handleCloseDeleteModal}
                    onCancel={handleCloseDeleteModal}
                />
            ),
        });
    };

    const handleOpenArticleDetail = () => router.push({ pathname: "/admin/articles/[id]", query: { id: String(row.original.id) } });
    const handleOpenEditArticle = () => router.push({ pathname: "/admin/articles/[id]/edit", query: { id: String(row.original.id) } });

    const renderItems = () => {
        if (userRole?.name === Roles.teacher) {
            return (
                <MenuItemDataGrid onClick={handleOpenArticleDetail}>
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
                <Divider size={1} color="neutralGray100" mx={12} />
                <MenuItemDataGrid mt={8} onClick={handleOpenArticleDetail}>
                    <ThemeIcon w={16} h={16} color="primary">
                        <Eye />
                    </ThemeIcon>
                    Открыть
                </MenuItemDataGrid>
                <MenuItemDataGrid onClick={handleOpenEditArticle}>
                    <ThemeIcon w={16} h={16} color="primary">
                        <Edit3 />
                    </ThemeIcon>
                    Редактировать
                </MenuItemDataGrid>
                <MenuItemDataGrid onClick={openDeleteModal}>
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
