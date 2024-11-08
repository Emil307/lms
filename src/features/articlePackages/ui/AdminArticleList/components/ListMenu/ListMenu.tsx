import { ThemeIcon } from "@mantine/core";
import { MRT_Row } from "mantine-react-table";
import React from "react";
import { Eye, Trash } from "react-feather";
import { closeModal, openModal } from "@mantine/modals";
import { useRouter } from "next/router";
import { MenuDataGrid, MenuItemDataGrid } from "@shared/ui";
import { DeleteArticleFromArticlePackageModal } from "@features/articlePackages";
import { AdminArticleFromList } from "@entities/article";

interface ListMenuProps {
    articlePackageId: string;
    row: MRT_Row<AdminArticleFromList>;
}

const ListMenu = ({ row, articlePackageId }: ListMenuProps) => {
    const router = useRouter();
    const handleOpenDetailsPage = () => router.push({ pathname: "/admin/articles/[id]", query: { id: String(row.original.id) } });

    const handleCloseDeleteModal = () => closeModal("DELETE_ARTICLE_FROM_PACKAGE");

    const openDeleteModal = () => {
        openModal({
            modalId: "DELETE_ARTICLE_FROM_PACKAGE",
            title: "Удаление статьи",
            children: (
                <DeleteArticleFromArticlePackageModal
                    id={row.original.id}
                    articlePackageId={articlePackageId}
                    name={row.original.name}
                    onClose={handleCloseDeleteModal}
                />
            ),
        });
    };

    return (
        <MenuDataGrid>
            <MenuItemDataGrid onClick={handleOpenDetailsPage}>
                <ThemeIcon w={16} h={16} color="primary">
                    <Eye />
                </ThemeIcon>
                Открыть
            </MenuItemDataGrid>
            <MenuItemDataGrid onClick={openDeleteModal}>
                <ThemeIcon w={16} h={16} color="primary">
                    <Trash />
                </ThemeIcon>
                Удалить статью из пакета
            </MenuItemDataGrid>
        </MenuDataGrid>
    );
};

export default ListMenu;
