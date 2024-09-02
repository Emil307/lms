import { Divider, ThemeIcon } from "@mantine/core";
import { MRT_Row } from "mantine-react-table";
import React, { ChangeEvent } from "react";
import { Download, Edit3, Trash } from "react-feather";
import { closeAllModals, closeModal, openModal } from "@mantine/modals";
import { saveAs } from "file-saver";
import { MenuDataGrid, MenuItemDataGrid, Switch } from "@shared/ui";
import { UploadedFileFromList, useUpdateUploadedFileActivity } from "@entities/storage";
import { DeleteMaterialModal, UpdateMaterialsForm, MATERIALS_LOCAL_STORAGE_KEY } from "@features/materials";
import { useUserRole } from "@entities/auth";
import { Roles } from "@shared/types";

interface UsersListMenuProps {
    row: MRT_Row<UploadedFileFromList>;
}

const ListMenu = ({ row }: UsersListMenuProps) => {
    const { mutate: updateActivityStatus } = useUpdateUploadedFileActivity(row.original.id, row.original.name);

    const userRole = useUserRole();

    const handleCloseDeleteModal = () => closeModal("DELETE_MATERIAL");
    const handleCloseEditMaterialFormModal = () => {
        handleClearStorage();
        closeModal("EDIT_MATERIAL");
    };

    const handleSubmitEditMaterialFormModal = () => {
        closeAllModals();
        handleClearStorage();
    };
    const handleClearStorage = () => sessionStorage.removeItem(MATERIALS_LOCAL_STORAGE_KEY);

    const openDeleteModal = () => {
        openModal({
            modalId: "DELETE_MATERIAL",
            title: "Удаление материала",
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
            children: (
                <UpdateMaterialsForm
                    data={row.original}
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

    const renderItems = () => {
        if (userRole?.name === Roles.teacher) {
            return (
                <MenuItemDataGrid onClick={handleDownload}>
                    <ThemeIcon w={16} h={16} color="primary">
                        <Download />
                    </ThemeIcon>
                    Скачать
                </MenuItemDataGrid>
            );
        }
        return (
            <>
                <MenuItemDataGrid closeMenuOnClick={false} py={4}>
                    <Switch
                        variant="secondary"
                        checked={row.original.isActive}
                        label={labelActivitySwitch}
                        labelPosition="left"
                        onChange={handleChangeActiveStatus}
                        w="100%"
                    />
                </MenuItemDataGrid>

                <Divider size={1} color="light" mx={12} />

                <MenuItemDataGrid mt={8} onClick={handleDownload}>
                    <ThemeIcon w={16} h={16} color="primary">
                        <Download />
                    </ThemeIcon>
                    Скачать
                </MenuItemDataGrid>

                <MenuItemDataGrid onClick={openModalEditFile}>
                    <ThemeIcon w={16} h={16} color="primary">
                        <Edit3 />
                    </ThemeIcon>
                    Редактировать
                </MenuItemDataGrid>
                <MenuItemDataGrid onClick={openDeleteModal}>
                    <ThemeIcon w={16} h={16} color="primary">
                        <Trash />
                    </ThemeIcon>
                    Удалить
                </MenuItemDataGrid>
            </>
        );
    };

    return <MenuDataGrid>{renderItems()}</MenuDataGrid>;
};

export default ListMenu;
