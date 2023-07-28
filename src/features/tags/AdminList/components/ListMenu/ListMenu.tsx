import { ThemeIcon } from "@mantine/core";
import { MRT_Row } from "mantine-react-table";
import React from "react";
import { Edit3, Trash } from "react-feather";
import { closeModal, openModal } from "@mantine/modals";
import { MenuDataGrid, MenuItemDataGrid } from "@shared/ui";
import { DeleteTagModal, UpdateTagForm } from "@features/tags";
import { AdminTagFromList } from "@entities/tag";

interface UsersListMenuProps {
    row: MRT_Row<AdminTagFromList>;
}

const ListMenu = ({ row }: UsersListMenuProps) => {
    const handleCloseDeleteTagModal = () => closeModal("DELETE_TAG");
    const handleCloseEditTagModal = () => closeModal("UPDATE_TAG");

    const openModalDeleteTag = () => {
        openModal({
            modalId: "DELETE_TAG",
            title: "Удаление тега",
            children: <DeleteTagModal id={String(row.original.id)} name={row.original.name} onClose={handleCloseDeleteTagModal} />,
        });
    };

    const openModalEditTag = () => {
        openModal({
            modalId: "UPDATE_TAG",
            title: "Редактирование",
            children: <UpdateTagForm data={row.original} onClose={handleCloseEditTagModal} />,
        });
    };

    return (
        <MenuDataGrid>
            <MenuItemDataGrid onClick={openModalEditTag}>
                <ThemeIcon w={16} h={16} color="primary">
                    <Edit3 />
                </ThemeIcon>
                Редактировать
            </MenuItemDataGrid>
            <MenuItemDataGrid onClick={openModalDeleteTag}>
                <ThemeIcon w={16} h={16} color="primary">
                    <Trash />
                </ThemeIcon>
                Удалить
            </MenuItemDataGrid>
        </MenuDataGrid>
    );
};

export default ListMenu;
