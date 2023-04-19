import { Divider, ThemeIcon } from "@mantine/core";
import { MRT_Row } from "mantine-react-table";
import React from "react";
import { Edit3, Eye, Trash } from "react-feather";
import { closeModal, openModal } from "@mantine/modals";
import { useRouter } from "next/router";
import { MenuDataGrid, MenuItemDataGrid, Switch } from "@shared/ui";
import { AdminCategory, useActivateCategory, useDeactivateCategory } from "@entities/category";
import { DeleteCategoryModal, EditCategoryForm } from "@features/categories";

interface ListMenuProps {
    row: MRT_Row<AdminCategory>;
}

const ListMenu = ({ row }: ListMenuProps) => {
    const router = useRouter();
    const { mutate: activate } = useActivateCategory(String(row.original.id));
    const { mutate: deactivate } = useDeactivateCategory(String(row.original.id));

    const labelActivitySwitch = row.original.isActive ? "Деактивировать" : "Активировать";

    const handleOpenCategoryDetail = () =>
        router.push({ pathname: "/admin/settings/categories/[id]", query: { id: String(row.original.id) } });

    const handleCloseDeleteCategoryModal = () => closeModal("DELETE_CATEGORY");
    const handleCloseEditCategoryModal = () => closeModal("EDIT_CATEGORY");

    const handleChangeActiveStatus = () => {
        if (row.original.isActive) {
            return deactivate();
        }
        return activate();
    };

    const openModalDeleteCategory = () => {
        openModal({
            modalId: "DELETE_CATEGORY",
            title: "Удаление категории",
            centered: true,
            children: (
                <DeleteCategoryModal id={String(row.original.id)} name={row.original.name} onClose={handleCloseDeleteCategoryModal} />
            ),
        });
    };

    const openModalEditCategory = () => {
        openModal({
            modalId: "EDIT_CATEGORY",
            title: "Редактирование",
            centered: true,
            children: <EditCategoryForm data={row.original} onClose={handleCloseEditCategoryModal} />,
        });
    };

    return (
        <MenuDataGrid>
            <MenuItemDataGrid onClick={handleChangeActiveStatus} closeMenuOnClick={false}>
                <Switch variant="secondary" checked={row.original.isActive} label={labelActivitySwitch} labelPosition="left" />
            </MenuItemDataGrid>

            <Divider size={1} color="light" mx={12} />
            <MenuItemDataGrid mt={8} onClick={handleOpenCategoryDetail}>
                <ThemeIcon w={16} h={16} color="primary" variant="outline" sx={{ border: "none" }}>
                    <Eye />
                </ThemeIcon>
                Открыть
            </MenuItemDataGrid>
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