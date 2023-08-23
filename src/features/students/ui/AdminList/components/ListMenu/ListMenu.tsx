import { Divider, ThemeIcon } from "@mantine/core";
import { MRT_Row } from "mantine-react-table";
import React, { ChangeEvent } from "react";
import { Edit3, Eye, Trash } from "react-feather";
import { closeModal, openModal } from "@mantine/modals";
import { UserFromList, useUpdateUserActivity } from "@entities/user";
import { MenuDataGrid, MenuItemDataGrid, Switch } from "@shared/ui";
import { UserDeleteModal } from "@features/users";
import { getFullName } from "@shared/utils";
import { useUserRole } from "@entities/auth/hooks";
import { Roles } from "@app/routes";

export interface ListMenuProps {
    row: MRT_Row<UserFromList>;
}

const ListMenu = ({ row }: ListMenuProps) => {
    const userFullName = getFullName({ data: row.original.profile });
    const { mutate: updateActivityStatus } = useUpdateUserActivity({ id: String(row.original.id), fio: userFullName });

    const userRole = useUserRole();

    const labelActivitySwitch = row.original.isActive ? "Деактивировать" : "Активировать";

    const handleChangeActiveStatus = (newValue: ChangeEvent<HTMLInputElement>) => updateActivityStatus(newValue.target.checked);

    const handleCloseDeleteModal = () => closeModal("DELETE_USER");

    const handleOpenDeleteModal = () => {
        openModal({
            modalId: "DELETE_USER",
            title: "Удаление пользователя",
            children: (
                <UserDeleteModal
                    id={String(row.original.id)}
                    fio={userFullName}
                    onSuccess={handleCloseDeleteModal}
                    onCancel={handleCloseDeleteModal}
                />
            ),
        });
    };

    const renderItems = () => {
        if (userRole === Roles.teacher) {
            return (
                <MenuItemDataGrid>
                    <ThemeIcon w={16} h={16} color="primary">
                        <Eye />
                    </ThemeIcon>
                    Открыть
                </MenuItemDataGrid>
            );
        }
        return (
            <>
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

                <MenuItemDataGrid mt={8}>
                    <ThemeIcon w={16} h={16} color="primary">
                        <Eye />
                    </ThemeIcon>
                    Открыть
                </MenuItemDataGrid>

                <MenuItemDataGrid>
                    <ThemeIcon w={16} h={16} color="primary">
                        <Edit3 />
                    </ThemeIcon>
                    Редактировать
                </MenuItemDataGrid>
                <MenuItemDataGrid onClick={handleOpenDeleteModal}>
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
