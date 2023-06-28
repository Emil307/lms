import { ThemeIcon } from "@mantine/core";
import { MRT_Row } from "mantine-react-table";
import React from "react";
import { Edit3, Trash } from "react-feather";
import { closeModal, openModal } from "@mantine/modals";
import { MenuDataGrid, MenuItemDataGrid } from "@shared/ui";
import { Advantage } from "@entities/staticPage";
import { DeleteAdvantageModal, UpdateAdvantageForm } from "@features/advantages";

interface ListMenuProps {
    row: MRT_Row<Advantage>;
}

const ListMenu = ({ row }: ListMenuProps) => {
    const handleCloseDeleteAdvantageModal = () => closeModal("DELETE_ADVANTAGE");
    const handleCloseEditAdvantageModal = () => closeModal("UPDATE_ADVANTAGE");

    const openModalDeleteAdvantage = () => {
        openModal({
            modalId: "DELETE_ADVANTAGE",
            title: "Удаление преимущества",
            centered: true,
            children: (
                <DeleteAdvantageModal id={String(row.original.id)} name={row.original.title} onClose={handleCloseDeleteAdvantageModal} />
            ),
        });
    };

    const openModalAdvantageTag = () => {
        openModal({
            modalId: "UPDATE_ADVANTAGE",
            title: "Редактирование",
            centered: true,
            children: <UpdateAdvantageForm data={row.original} onClose={handleCloseEditAdvantageModal} />,
        });
    };

    return (
        <MenuDataGrid>
            <MenuItemDataGrid onClick={openModalAdvantageTag}>
                <ThemeIcon w={16} h={16} color="primary" variant="outline" sx={{ border: "none" }}>
                    <Edit3 />
                </ThemeIcon>
                Редактировать
            </MenuItemDataGrid>
            <MenuItemDataGrid onClick={openModalDeleteAdvantage}>
                <ThemeIcon w={16} h={16} color="primary" variant="outline" sx={{ border: "none" }}>
                    <Trash />
                </ThemeIcon>
                Удалить
            </MenuItemDataGrid>
        </MenuDataGrid>
    );
};

export default ListMenu;
