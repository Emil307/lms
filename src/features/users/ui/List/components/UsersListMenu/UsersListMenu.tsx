import { Box, ThemeIcon, useMantineTheme } from "@mantine/core";
import { MRT_Row } from "mantine-react-table";
import { useRouter } from "next/router";
import React from "react";
import { Edit3, Eye, Trash } from "react-feather";
import { openModal } from "@mantine/modals";
import { TUser, useChangeUserActivityStatus } from "@entities/user";
import { MenuDataGrid, MenuItemDataGrid, Switch } from "@shared/ui";
import { UserDeleteModal } from "@features/users";
import { getFullNameFromProfile } from "@shared/utils";

interface UsersListMenuProps {
    row: MRT_Row<TUser>;
}

const UsersListMenu = ({ row }: UsersListMenuProps) => {
    const router = useRouter();
    const theme = useMantineTheme();
    const changeUserActivityStatus = useChangeUserActivityStatus(String(row.original.id));

    const labelActivitySwitch = row.original.isActive ? "Деактивировать" : "Активировать";

    const toggleActivateUser = (row: MRT_Row<TUser>) => {
        changeUserActivityStatus.mutate(!row.original.isActive);
    };

    const openModalDeleteUser = (id: string, fio: string) => {
        openModal({
            modalId: `${id}`,
            title: "Удаление пользователя",
            centered: true,
            children: <UserDeleteModal id={id} fio={fio} />,
        });
    };

    const pushOnUserDetail = (id: number) => {
        router.push({ pathname: "/admin/users/[id]", query: { id: String(id) } });
    };

    const pushOnUserEdit = (id: number) => {
        router.push({ pathname: "/admin/users/[id]/edit", query: { id: String(id) } });
    };

    return (
        <MenuDataGrid>
            <MenuItemDataGrid onClick={() => toggleActivateUser(row)} closeMenuOnClick={false}>
                <Switch variant="primary" checked={row.original.isActive} label={labelActivitySwitch} labelPosition="left" />
            </MenuItemDataGrid>
            <Box
                sx={{
                    height: 1,
                    backgroundColor: theme.colors.light[0],
                    margin: "0 12px",
                }}></Box>
            <MenuItemDataGrid
                mt={8}
                onClick={() => {
                    pushOnUserDetail(row.original.id);
                }}>
                <ThemeIcon w={16} h={16} color="primary" variant="outline" sx={{ border: "none" }}>
                    <Eye />
                </ThemeIcon>
                Открыть
            </MenuItemDataGrid>
            <MenuItemDataGrid onClick={() => pushOnUserEdit(row.original.id)}>
                <ThemeIcon w={16} h={16} color="primary" variant="outline" sx={{ border: "none" }}>
                    <Edit3 />
                </ThemeIcon>
                Редактировать
            </MenuItemDataGrid>
            <MenuItemDataGrid onClick={() => openModalDeleteUser(String(row.original.id), getFullNameFromProfile(row.original.profile))}>
                <ThemeIcon w={16} h={16} color="primary" variant="outline" sx={{ border: "none" }}>
                    <Trash />
                </ThemeIcon>
                Удалить
            </MenuItemDataGrid>
        </MenuDataGrid>
    );
};

export default UsersListMenu;
