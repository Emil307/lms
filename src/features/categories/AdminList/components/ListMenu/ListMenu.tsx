import { Divider, ThemeIcon } from "@mantine/core";
import { MRT_Row } from "mantine-react-table";
import React, { ChangeEvent } from "react";
import { Edit3, Eye, Trash } from "react-feather";
import { closeModal, openModal } from "@mantine/modals";
import { useRouter } from "next/router";
import { MenuDataGrid, MenuItemDataGrid, Switch } from "@shared/ui";
import { AdminCategoryFromList, useAdminUpdateCategoryActivity } from "@entities/category";
import { DeleteCategoryModal, UpdateCategoryForm } from "@features/categories";

interface ListMenuProps {
    row: MRT_Row<AdminCategoryFromList>;
}

const ListMenu = ({ row }: ListMenuProps) => {
    const router = useRouter();

    const { mutate: updateActivityStatus } = useAdminUpdateCategoryActivity({ id: String(row.original.id) });

    const labelActivitySwitch = row.original.isActive ? "Деактивировать" : "Активировать";

    const handleChangeActiveStatus = (newValue: ChangeEvent<HTMLInputElement>) =>
        updateActivityStatus({ isActive: newValue.target.checked });

    const handleOpenCategoryDetail = () =>
        router.push({ pathname: "/admin/settings/categories/[id]", query: { id: String(row.original.id) } });

    const handleCloseDeleteCategoryModal = () => closeModal("DELETE_CATEGORY");
    const handleCloseUpdateCategoryModal = () => closeModal("UPDATE_CATEGORY");

    const openDeleteCategoryModal = () => {
        openModal({
            modalId: "DELETE_CATEGORY",
            title: "Удаление категории",
            children: (
                <DeleteCategoryModal id={String(row.original.id)} name={row.original.name} onClose={handleCloseDeleteCategoryModal} />
            ),
        });
    };

    const openUpdateCategoryModal = () => {
        openModal({
            modalId: "UPDATE_CATEGORY",
            title: "Редактирование",
            children: <UpdateCategoryForm id={String(row.original.id)} onClose={handleCloseUpdateCategoryModal} />,
        });
    };

    return (
        <MenuDataGrid>
            <MenuItemDataGrid closeMenuOnClick={false}>
                <Switch
                    variant="secondary"
                    checked={row.original.isActive}
                    label={labelActivitySwitch}
                    labelPosition="left"
                    onChange={handleChangeActiveStatus}
                />
            </MenuItemDataGrid>
            <Divider size={1} color="light" mx={12} />
            <MenuItemDataGrid mt={8} onClick={handleOpenCategoryDetail}>
                <ThemeIcon w={16} h={16} color="primary">
                    <Eye />
                </ThemeIcon>
                Открыть
            </MenuItemDataGrid>
            <MenuItemDataGrid onClick={openUpdateCategoryModal}>
                <ThemeIcon w={16} h={16} color="primary">
                    <Edit3 />
                </ThemeIcon>
                Редактировать
            </MenuItemDataGrid>
            <MenuItemDataGrid onClick={openDeleteCategoryModal}>
                <ThemeIcon w={16} h={16} color="primary">
                    <Trash />
                </ThemeIcon>
                Удалить
            </MenuItemDataGrid>
        </MenuDataGrid>
    );
};

export default ListMenu;
