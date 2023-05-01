import { Divider, ThemeIcon } from "@mantine/core";
import { MRT_Row } from "mantine-react-table";
import React from "react";
import { Edit3, Eye, Trash } from "react-feather";
import { closeModal, openModal } from "@mantine/modals";
import { useRouter } from "next/router";
import { MenuDataGrid, MenuItemDataGrid, Switch } from "@shared/ui";
import { AdminArticle, useDeactivateArticle } from "@entities/article";
import { useActivateArticle } from "@entities/article";
import { DeleteArticleModal } from "@features/articles";

interface ListMenuProps {
    row: MRT_Row<AdminArticle>;
}

const ListMenu = ({ row }: ListMenuProps) => {
    const router = useRouter();
    const { mutate: activate } = useActivateArticle(String(row.original.id));
    const { mutate: deactivate } = useDeactivateArticle(String(row.original.id));

    const labelActivitySwitch = row.original.isActive ? "Деактивировать" : "Активировать";

    const handleChangeActiveStatus = () => {
        if (row.original.isActive) {
            return deactivate();
        }
        return activate();
    };

    const handleCloseDeleteModal = () => closeModal("DELETE_ARTICLE");

    const openDeleteModal = () => {
        openModal({
            modalId: "DELETE_ARTICLE",
            title: "Удаление статьи",
            centered: true,
            children: <DeleteArticleModal id={String(row.original.id)} name={row.original.name} onClose={handleCloseDeleteModal} />,
        });
    };

    const handleOpenArticleDetail = () => router.push({ pathname: "/admin/articles/[id]", query: { id: String(row.original.id) } });
    const handleOpenEditArticle = () => router.push({ pathname: "/admin/articles/[id]/edit", query: { id: String(row.original.id) } });

    return (
        <MenuDataGrid>
            <MenuItemDataGrid closeMenuOnClick={false}>
                <Switch
                    variant="secondary"
                    checked={row.original.isActive}
                    label={labelActivitySwitch}
                    labelPosition="left"
                    onClick={handleChangeActiveStatus}
                />
            </MenuItemDataGrid>
            <Divider size={1} color="light" mx={12} />
            <MenuItemDataGrid mt={8} onClick={handleOpenArticleDetail}>
                <ThemeIcon w={16} h={16} color="primary" variant="outline" sx={{ border: "none" }}>
                    <Eye />
                </ThemeIcon>
                Открыть
            </MenuItemDataGrid>
            <MenuItemDataGrid onClick={handleOpenEditArticle}>
                <ThemeIcon w={16} h={16} color="primary" variant="outline" sx={{ border: "none" }}>
                    <Edit3 />
                </ThemeIcon>
                Редактировать
            </MenuItemDataGrid>
            <MenuItemDataGrid onClick={openDeleteModal}>
                <ThemeIcon w={16} h={16} color="primary" variant="outline" sx={{ border: "none" }}>
                    <Trash />
                </ThemeIcon>
                Удалить
            </MenuItemDataGrid>
        </MenuDataGrid>
    );
};

export default ListMenu;
