import { Divider, ThemeIcon } from "@mantine/core";
import { MRT_Row } from "mantine-react-table";
import React from "react";
import { Edit3, Trash } from "react-feather";
import { closeModal, openModal } from "@mantine/modals";
import { MenuDataGrid, MenuItemDataGrid, Switch } from "@shared/ui";
import { AdminStaticReview, useActivateStaticReview, useDeactivateStaticReview } from "@entities/staticReview";
import { DeleteStaticReviewModal } from "@features/staticReviews";

interface ListMenuProps {
    row: MRT_Row<AdminStaticReview>;
}

const ListMenu = ({ row }: ListMenuProps) => {
    const { mutate: activate } = useActivateStaticReview(String(row.original.id));
    const { mutate: deactivate } = useDeactivateStaticReview(String(row.original.id));

    const labelActivitySwitch = row.original.isActive ? "Деактивировать" : "Активировать";
    const handleCloseDeleteReviewModal = () => closeModal("DELETE_STATIC_REVIEW");

    const openModalDeleteReview = () => {
        openModal({
            modalId: "DELETE_STATIC_REVIEW",
            title: "Удаление отзыва",
            centered: true,
            children: (
                <DeleteStaticReviewModal id={String(row.original.id)} name={row.original.fullName} onClose={handleCloseDeleteReviewModal} />
            ),
        });
    };

    const handleChangeActiveStatus = () => {
        if (row.original.isActive) {
            return deactivate();
        }
        return activate();
    };

    return (
        <MenuDataGrid>
            <MenuItemDataGrid onClick={handleChangeActiveStatus} closeMenuOnClick={false}>
                <Switch variant="secondary" checked={row.original.isActive} label={labelActivitySwitch} labelPosition="left" />
            </MenuItemDataGrid>
            <Divider size={1} color="light" mx={12} />
            <MenuItemDataGrid>
                <ThemeIcon w={16} h={16} color="primary" variant="outline" sx={{ border: "none" }}>
                    <Edit3 />
                </ThemeIcon>
                Редактировать
            </MenuItemDataGrid>
            <MenuItemDataGrid onClick={openModalDeleteReview}>
                <ThemeIcon w={16} h={16} color="primary" variant="outline" sx={{ border: "none" }}>
                    <Trash />
                </ThemeIcon>
                Удалить
            </MenuItemDataGrid>
        </MenuDataGrid>
    );
};

export default ListMenu;
