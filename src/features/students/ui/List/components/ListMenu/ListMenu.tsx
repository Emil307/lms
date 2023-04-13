import { Box, ThemeIcon, useMantineTheme } from "@mantine/core";
import { MRT_Row } from "mantine-react-table";
import React from "react";
import { Edit3, Eye, Trash } from "react-feather";
import { openModal } from "@mantine/modals";
import { TUser, useActivateUser, useDeactivateUser } from "@entities/user";
import { MenuDataGrid, MenuItemDataGrid, Switch } from "@shared/ui";
import { UserDeleteModal } from "@features/users/UserDeleteModal";

interface ListMenuProps {
    row: MRT_Row<TUser>;
}

const ListMenu = ({ row }: ListMenuProps) => {
    const theme = useMantineTheme();
    const activateUser = useActivateUser(String(row.original.id));
    const deactivateUser = useDeactivateUser(String(row.original.id));

    const toggleActivateUser = (row: MRT_Row<TUser>) => {
        if (row.original.isActive) {
            return deactivateUser.mutate();
        }
        activateUser.mutate();
    };

    const openModalDeleteUser = (id: string, fio: string) => {
        openModal({
            modalId: `${id}`,
            title: "Удаление пользователя",
            centered: true,
            children: <UserDeleteModal id={id} fio={fio} />,
        });
    };

    return (
        <MenuDataGrid>
            <MenuItemDataGrid
                onClick={() => {
                    toggleActivateUser(row);
                }}
                closeMenuOnClick={false}>
                Деактивировать <Switch variant="primary" checked={row.original.isActive} />
            </MenuItemDataGrid>
            <Box
                sx={{
                    height: 1,
                    backgroundColor: theme.colors.light[0],
                    margin: "0 12px",
                }}></Box>
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
            <MenuItemDataGrid onClick={() => openModalDeleteUser(String(row.original.id), row.original.fullName)}>
                <ThemeIcon w={16} h={16} color="primary" variant="outline" sx={{ border: "none" }}>
                    <Trash />
                </ThemeIcon>
                Удалить
            </MenuItemDataGrid>
        </MenuDataGrid>
    );
};

export default ListMenu;