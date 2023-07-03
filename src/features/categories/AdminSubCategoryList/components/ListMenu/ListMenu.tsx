import { ThemeIcon } from "@mantine/core";
import { MRT_Row } from "mantine-react-table";
import React from "react";
import { Edit3, Trash } from "react-feather";
import { closeModal, openModal } from "@mantine/modals";
import { MenuDataGrid, MenuItemDataGrid } from "@shared/ui";
import { AdminSubCategoryFromList } from "@entities/category";
import { DeleteCategoryModal, UpdateCategoryForm } from "@features/categories";

interface UsersListMenuProps {
    row: MRT_Row<AdminSubCategoryFromList>;
}

const ListMenu = ({ row }: UsersListMenuProps) => {
    const handleCloseDeleteCategoryModal = () => closeModal("DELETE_SUBCATEGORY");
    const handleCloseUpdateCategoryModal = () => closeModal("UPDATE_SUBCATEGORY");

    const openDeleteSubCategoryModal = () => {
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

    const openUpdateCategoryModal = () => {
        openModal({
            modalId: "UPDATE_SUBCATEGORY",
            title: "Редактирование подкатегории",
            centered: true,
            children: <UpdateCategoryForm id={String(row.original.id)} onClose={handleCloseUpdateCategoryModal} />,
        });
    };

    return (
        <MenuDataGrid>
            <MenuItemDataGrid onClick={openUpdateCategoryModal}>
                <ThemeIcon w={16} h={16} color="primary" variant="outline" sx={{ border: "none" }}>
                    <Edit3 />
                </ThemeIcon>
                Редактировать
            </MenuItemDataGrid>
            <MenuItemDataGrid onClick={openDeleteSubCategoryModal}>
                <ThemeIcon w={16} h={16} color="primary" variant="outline" sx={{ border: "none" }}>
                    <Trash />
                </ThemeIcon>
                Удалить
            </MenuItemDataGrid>
        </MenuDataGrid>
    );
};

export default ListMenu;
