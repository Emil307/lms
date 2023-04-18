import { ThemeIcon } from "@mantine/core";
import { MRT_Row } from "mantine-react-table";
import React from "react";
import { Edit3, Trash } from "react-feather";
import { closeModal, openModal } from "@mantine/modals";
import { useRouter } from "next/router";
import { MenuDataGrid, MenuItemDataGrid } from "@shared/ui";
import { AdminCategory } from "@entities/category";
import { DeleteCategoryModal, EditCategoryForm } from "@features/categories";

interface TRouterQueries {
    id: string;
}

interface UsersListMenuProps {
    row: MRT_Row<AdminCategory>;
}

const ListMenu = ({ row }: UsersListMenuProps) => {
    const { id } = useRouter().query as TRouterQueries;
    const handleCloseDeleteCategoryModal = () => closeModal("DELETE_SUBCATEGORY");
    const handleCloseEditCategoryModal = () => closeModal("EDIT_SUBCATEGORY");

    const openModalDeleteCategory = () => {
        openModal({
            modalId: "DELETE_SUBCATEGORY",
            title: "Удаление подкатегории",
            centered: true,
            children: (
                <DeleteCategoryModal
                    isSubcategory
                    id={String(row.original.id)}
                    name={row.original.name}
                    onClose={handleCloseDeleteCategoryModal}
                />
            ),
        });
    };

    const openModalEditCategory = () => {
        openModal({
            modalId: "EDIT_SUBCATEGORY",
            title: "Редактирование подкатегории",
            centered: true,
            children: <EditCategoryForm parentId={Number(id)} data={row.original} onClose={handleCloseEditCategoryModal} />,
        });
    };

    return (
        <MenuDataGrid>
            <MenuItemDataGrid onClick={openModalEditCategory}>
                <ThemeIcon w={16} h={16} color="primary" variant="outline" sx={{ border: "none" }}>
                    <Edit3 />
                </ThemeIcon>
                Редактировать
            </MenuItemDataGrid>
            <MenuItemDataGrid onClick={openModalDeleteCategory}>
                <ThemeIcon w={16} h={16} color="primary" variant="outline" sx={{ border: "none" }}>
                    <Trash />
                </ThemeIcon>
                Удалить
            </MenuItemDataGrid>
        </MenuDataGrid>
    );
};

export default ListMenu;
