import { ThemeIcon } from "@mantine/core";
import { MRT_Row } from "mantine-react-table";
import React from "react";
import { Eye, Trash } from "react-feather";
import { closeModal, openModal } from "@mantine/modals";
import { MenuDataGrid, MenuItemDataGrid } from "@shared/ui";
import { AdminArticleFromArticlePackage } from "@entities/articlePackage";
import { DeleteArticleFromArticlePackageModal } from "@features/articlePackages";

interface ListMenuProps {
    articlePackageId: string;
    row: MRT_Row<AdminArticleFromArticlePackage>;
}

const ListMenu = ({ row, articlePackageId }: ListMenuProps) => {
    //TODO: Добавить редирект после того как будет готова детальная страница статьи в базе знаний
    const handleOpenDetailPage = () => undefined;

    const handleCloseDeleteModal = () => closeModal("DELETE_ARTICLE_FROM_PACKAGE");

    const openDeleteModal = () => {
        openModal({
            modalId: "DELETE_ARTICLE_FROM_PACKAGE",
            title: "Удаление статьи",
            centered: true,
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
            <MenuItemDataGrid mt={8} onClick={handleOpenDetailPage}>
                <ThemeIcon w={16} h={16} color="primary" variant="outline" sx={{ border: "none" }}>
                    <Eye />
                </ThemeIcon>
                Открыть
            </MenuItemDataGrid>
            <MenuItemDataGrid onClick={openDeleteModal}>
                <ThemeIcon w={16} h={16} color="primary" variant="outline" sx={{ border: "none" }}>
                    <Trash />
                </ThemeIcon>
                Удалить статью из пакета
            </MenuItemDataGrid>
        </MenuDataGrid>
    );
};

export default ListMenu;
