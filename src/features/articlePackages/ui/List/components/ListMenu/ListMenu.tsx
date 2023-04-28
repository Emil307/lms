import { Divider, ThemeIcon } from "@mantine/core";
import { MRT_Row } from "mantine-react-table";
import React from "react";
import { Edit3, Eye, Trash } from "react-feather";
import { closeModal, openModal } from "@mantine/modals";
import { useRouter } from "next/router";
import { MenuDataGrid, MenuItemDataGrid } from "@shared/ui";
import { AdminArticlePackage } from "@entities/articlePackage";
import { DeleteArticlePackageModal } from "@features/articlePackages";

interface ListMenuProps {
    row: MRT_Row<AdminArticlePackage>;
}

const ListMenu = ({ row }: ListMenuProps) => {
    const router = useRouter();
    /* TODO: Как бекенд добавит статусы */

    // const labelActivitySwitch = row.original.isActive ? "Деактивировать" : "Активировать";

    const handleCloseDeleteModal = () => closeModal("DELETE_ARTICLE_PACKAGE");

    const openDeleteModal = () => {
        openModal({
            modalId: "DELETE_ARTICLE_PACKAGE",
            title: "Удаление пакета",
            centered: true,
            children: <DeleteArticlePackageModal id={String(row.original.id)} name={row.original.name} onClose={handleCloseDeleteModal} />,
        });
    };

    const handleOpenDetailPage = () =>
        router.push({ pathname: "/admin/settings/article-packages/[id]", query: { id: row.original.id.toString() } });
    const handleOpenEditPage = () =>
        router.push({ pathname: "/admin/settings/article-packages/[id]/edit", query: { id: row.original.id.toString() } });

    return (
        <MenuDataGrid>
            {/* TODO: Как бекенд добавит статусы */}
            {/* <MenuItemDataGrid closeMenuOnClick={false}>
                <Switch variant="secondary" checked={row.original.isActive} label={labelActivitySwitch} labelPosition="left" />
            </MenuItemDataGrid> */}

            <Divider size={1} color="light" mx={12} />
            <MenuItemDataGrid mt={8} onClick={handleOpenDetailPage}>
                <ThemeIcon w={16} h={16} color="primary" variant="outline" sx={{ border: "none" }}>
                    <Eye />
                </ThemeIcon>
                Открыть
            </MenuItemDataGrid>
            <MenuItemDataGrid onClick={handleOpenEditPage}>
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
