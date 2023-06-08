import { Divider, ThemeIcon } from "@mantine/core";
import { MRT_Row } from "mantine-react-table";
import React, { ChangeEvent } from "react";
import { Download, Edit3, Trash } from "react-feather";
import { closeAllModals, closeModal, openModal } from "@mantine/modals";
import { saveAs } from "file-saver";
import { MenuDataGrid, MenuItemDataGrid, Switch } from "@shared/ui";
import { UploadedFileFromList, useUpdateUploadedFileActivity } from "@entities/storage";
import { DeleteMaterialModal, UpdateMaterialsForm, MATERIALS_LOCAL_STORAGE_KEY } from "@features/materials";

interface UsersListMenuProps {
    row: MRT_Row<UploadedFileFromList>;
}

const ListMenu = ({ row }: UsersListMenuProps) => {
    const { mutate: updateActivityStatus } = useUpdateUploadedFileActivity(row.original.id);

    const handleCloseDeleteModal = () => closeModal("DELETE_MATERIAL");
    const handleCloseEditMaterialFormModal = () => closeModal("EDIT_MATERIAL");

    const handleSubmitEditMaterialFormModal = () => {
        closeAllModals();
        handleClearStorage();
    };
    const handleClearStorage = () => sessionStorage.removeItem(MATERIALS_LOCAL_STORAGE_KEY);

    const openDeleteModal = () => {
        openModal({
            modalId: "DELETE_MATERIAL",
            title: "Удаление материала",
            centered: true,
            children: <DeleteMaterialModal id={String(row.original.id)} name={row.original.name} onClose={handleCloseDeleteModal} />,
        });
    };

    const openModalEditFile = () => {
        if (row.original.type.value === "image" || row.original.type.value === "avatar") {
            return;
        }
        openModal({
            modalId: "EDIT_MATERIAL",
            title: "Редактирование материала",
            centered: true,
            size: 456,
            children: (
                <UpdateMaterialsForm
                    data={[{ ...row.original }]}
                    hasCategories={!!row.original.categories.length}
                    type={row.original.type.value}
                    onSubmit={handleSubmitEditMaterialFormModal}
                    onClose={handleCloseEditMaterialFormModal}
                />
            ),
        });
    };
    const handleChangeActiveStatus = (newValue: ChangeEvent<HTMLInputElement>) => updateActivityStatus(newValue.target.checked);

    const handleDownload = () => saveAs(row.original.absolutePath, row.original.name);

    const labelActivitySwitch = row.original.isActive ? "Деактивировать" : "Активировать";

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
            <MenuItemDataGrid onClick={handleDownload}>
                <ThemeIcon w={16} h={16} color="primary" variant="outline" sx={{ border: "none" }}>
                    <Download />
                </ThemeIcon>
                Скачать
            </MenuItemDataGrid>
            <MenuItemDataGrid onClick={openModalEditFile}>
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
