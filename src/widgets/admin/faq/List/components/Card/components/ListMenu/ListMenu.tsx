import { Divider, ThemeIcon } from "@mantine/core";
import React, { ChangeEvent } from "react";
import { Edit3, Trash } from "react-feather";
import { closeModal, openModal } from "@mantine/modals";
import { MenuDataGrid, MenuItemDataGrid, Switch } from "@shared/ui";
import { DeleteFaqModal } from "@features/faq";
import { AdminFaqItem, useUpdateFaqActivity } from "@entities/staticPage";

export interface ListMenuProps {
    data: AdminFaqItem;
    openUpdateForm: (value: number) => void;
}

const ListMenu = ({ data, openUpdateForm }: ListMenuProps) => {
    const { mutate: updateActivityStatus } = useUpdateFaqActivity(data.id);

    const labelActivitySwitch = data.isActive ? "Деактивировать" : "Активировать";

    const handleChangeActiveStatus = (newValue: ChangeEvent<HTMLInputElement>) => updateActivityStatus(newValue.target.checked);

    const handleOpenUpdateForm = () => openUpdateForm(data.id);

    const handleCloseDeleteModal = () => closeModal("DELETE_QUESTION");

    const openDeleteModal = () => {
        openModal({
            modalId: "DELETE_QUESTION",
            title: "Удаление вопроса",
            centered: true,
            children: <DeleteFaqModal id={data.id} question={data.question} onClose={handleCloseDeleteModal} />,
        });
    };

    return (
        <MenuDataGrid>
            <MenuItemDataGrid closeMenuOnClick={false}>
                <Switch
                    variant="secondary"
                    checked={data.isActive}
                    label={labelActivitySwitch}
                    labelPosition="left"
                    onChange={handleChangeActiveStatus}
                />
            </MenuItemDataGrid>
            <Divider size={1} color="light" mx={12} />
            <MenuItemDataGrid onClick={handleOpenUpdateForm}>
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
