import { Divider, ThemeIcon } from "@mantine/core";
import { MRT_Row } from "mantine-react-table";
import React, { ChangeEvent } from "react";
import { Edit3, Eye, Trash } from "react-feather";
import { openModal } from "@mantine/modals";
import { UserFromList, useUpdateUserActivity } from "@entities/user";
import { MenuDataGrid, MenuItemDataGrid, Switch } from "@shared/ui";
import { UserDeleteModal } from "@features/users";
import { getFullName } from "@shared/utils";

interface ListMenuProps {
    row: MRT_Row<UserFromList>;
}

const ListMenu = ({ row }: ListMenuProps) => {
    const userFullName = getFullName({ data: row.original.profile });
    const { mutate: updateActivityStatus } = useUpdateUserActivity({ id: String(row.original.id), fio: userFullName });

    const labelActivitySwitch = row.original.isActive ? "Деактивировать" : "Активировать";

    const handleChangeActiveStatus = (newValue: ChangeEvent<HTMLInputElement>) =>
        updateActivityStatus({ isActive: newValue.target.checked });

    const openModalDeleteUser = (id: string, fio: string) => {
        openModal({
            modalId: `${id}`,
            title: "Удаление пользователя",
            children: <UserDeleteModal id={id} fio={fio} />,
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
            <MenuItemDataGrid mt={8}>
                <ThemeIcon w={16} h={16} color="primary" variant="outline" sx={{ border: "none" }}>
                    <Eye />
                </ThemeIcon>
                Открыть
            </MenuItemDataGrid>
            <MenuItemDataGrid>
                <ThemeIcon w={16} h={16} color="primary" variant="outline" sx={{ border: "none" }}>
                    <Edit3 />
                </ThemeIcon>
                Редактировать
            </MenuItemDataGrid>
            <MenuItemDataGrid onClick={() => openModalDeleteUser(String(row.original.id), userFullName)}>
                <ThemeIcon w={16} h={16} color="primary" variant="outline" sx={{ border: "none" }}>
                    <Trash />
                </ThemeIcon>
                Удалить
            </MenuItemDataGrid>
        </MenuDataGrid>
    );
};

export default ListMenu;
