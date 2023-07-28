import { ThemeIcon } from "@mantine/core";
import { MRT_Row } from "mantine-react-table";
import React from "react";
import { Download, Trash } from "react-feather";
import { closeModal, openModal } from "@mantine/modals";
import { saveAs } from "file-saver";
import { MenuDataGrid, MenuItemDataGrid } from "@shared/ui";
import { DeleteArticleMaterialModal } from "@features/articles";
import { UploadedFileFromList } from "@entities/storage";

interface ListMenuProps {
    row: MRT_Row<UploadedFileFromList>;
    articleId: string;
}

const ListMenu = ({ row, articleId }: ListMenuProps) => {
    const handleCloseDeleteModal = () => closeModal("DELETE_ARTICLE_MATERIAL");

    const openDeleteModal = () => {
        openModal({
            modalId: "DELETE_ARTICLE_MATERIAL",
            title: "Удаление материала",
            children: (
                <DeleteArticleMaterialModal
                    id={row.original.id}
                    articleId={articleId}
                    name={row.original.name}
                    onClose={handleCloseDeleteModal}
                />
            ),
        });
    };

    const handleDownloadFile = () => saveAs(row.original.absolutePath, row.original.name);

    return (
        <MenuDataGrid>
            <MenuItemDataGrid onClick={handleDownloadFile}>
                <ThemeIcon w={16} h={16} color="primary" variant="outline" sx={{ border: "none" }}>
                    <Download />
                </ThemeIcon>
                Скачать
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
