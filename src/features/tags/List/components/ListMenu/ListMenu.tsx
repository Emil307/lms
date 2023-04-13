import { ThemeIcon } from "@mantine/core";
import { MRT_Row } from "mantine-react-table";
import React from "react";
import { Edit3, Trash } from "react-feather";
import { closeModal, openModal } from "@mantine/modals";
import { MenuDataGrid, MenuItemDataGrid } from "@shared/ui";
import { AdminTag } from "@entities/tag";
import { DeleteTagModal, EditTagForm } from "@features/tags";

interface UsersListMenuProps {
    row: MRT_Row<AdminTag>;
}

const ListMenu = ({ row }: UsersListMenuProps) => {
    const handleCloseDeleteTagModal = () => closeModal("DELETE_TAG");
    const handleCloseEditTagModal = () => closeModal("EDIT_TAG");

    const openModalDeleteTag = () => {
        openModal({
            modalId: "DELETE_TAG",
            title: "Удаление тега",
            centered: true,
            children: <DeleteTagModal id={String(row.original.id)} name={row.original.name} onClose={handleCloseDeleteTagModal} />,
        });
    };

    const openModalEditTag = () => {
        openModal({
            modalId: "EDIT_TAG",
            title: "Редактирование",
            centered: true,
            children: <EditTagForm data={row.original} onClose={handleCloseEditTagModal} />,
        });
    };

    return (
        <MenuDataGrid>
            <MenuItemDataGrid onClick={openModalEditTag}>
                <ThemeIcon w={16} h={16} color="primary" variant="outline" sx={{ border: "none" }}>
                    <Edit3 />
                </ThemeIcon>
                Редактировать
            </MenuItemDataGrid>
            <MenuItemDataGrid onClick={openModalDeleteTag}>
                <ThemeIcon w={16} h={16} color="primary" variant="outline" sx={{ border: "none" }}>
                    <Trash />
                </ThemeIcon>
                Удалить
            </MenuItemDataGrid>
        </MenuDataGrid>
    );
};

export default ListMenu;
