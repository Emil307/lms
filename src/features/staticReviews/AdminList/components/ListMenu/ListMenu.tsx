import { Divider, ThemeIcon } from "@mantine/core";
import { MRT_Row } from "mantine-react-table";
import React, { ChangeEvent } from "react";
import { Edit3, Trash } from "react-feather";
import { closeModal, openModal } from "@mantine/modals";
import { useRouter } from "next/router";
import { MenuDataGrid, MenuItemDataGrid, Switch } from "@shared/ui";
import { AdminStaticReviewFromList, useUpdateStaticReviewActivityStatus } from "@entities/staticReview";
import { DeleteStaticReviewModal } from "@features/staticReviews";

interface ListMenuProps {
    row: MRT_Row<AdminStaticReviewFromList>;
}

const ListMenu = ({ row }: ListMenuProps) => {
    const router = useRouter();
    const { mutate: updateActivity } = useUpdateStaticReviewActivityStatus({ id: row.original.id });

    const labelActivitySwitch = row.original.isActive ? "Деактивировать" : "Активировать";
    const handleCloseDeleteReviewModal = () => closeModal("DELETE_STATIC_REVIEW");

    const openModalDeleteReview = () => {
        openModal({
            modalId: "DELETE_STATIC_REVIEW",
            title: "Удаление отзыва",
            children: (
                <DeleteStaticReviewModal
                    id={String(row.original.id)}
                    name={`${row.original.lastName} ${row.original.firstName}`}
                    onClose={handleCloseDeleteReviewModal}
                />
            ),
        });
    };

    const openEditReview = () =>
        router.push({ pathname: "/admin/settings/main-page/reviews/[id]/edit", query: { id: String(row.original.id) } });

    const handleChangeActiveStatus = (newValue: ChangeEvent<HTMLInputElement>) => updateActivity({ isActive: newValue.target.checked });

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
            <MenuItemDataGrid onClick={openEditReview}>
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
