import { Divider, ThemeIcon } from "@mantine/core";
import { MRT_Row } from "mantine-react-table";
import { useRouter } from "next/router";
import React, { ChangeEvent } from "react";
import { Edit3, Eye, Trash } from "react-feather";
import { openModal } from "@mantine/modals";
import { TUser, useUpdateUserActivity } from "@entities/user";
import { MenuDataGrid, MenuItemDataGrid, Switch } from "@shared/ui";
import { UserDeleteModal } from "@features/users";
import { checkRoleOrder, getFullName } from "@shared/utils";
import { useSession } from "@features/auth";

export interface UsersListMenuProps {
    row: MRT_Row<TUser>;
}

const UsersListMenu = ({ row }: UsersListMenuProps) => {
    const router = useRouter();
    const { user } = useSession();

    const isRoleOrder = checkRoleOrder(user?.roles[0].id, row.original.roles[0].id) >= 0;

    const { mutate: updateActivityStatus } = useUpdateUserActivity(String(row.original.id));

    const labelActivitySwitch = row.original.isActive ? "Деактивировать" : "Активировать";

    const handleChangeActiveStatus = (newValue: ChangeEvent<HTMLInputElement>) => updateActivityStatus(newValue.target.checked);

    const openModalDeleteUser = () => {
        openModal({
            modalId: `${row.original.id}`,
            title: "Удаление пользователя",
            centered: true,
            children: <UserDeleteModal id={String(row.original.id)} fio={getFullName({ data: row.original.profile })} />,
        });
    };

    const pushOnUserDetail = () => router.push({ pathname: "/admin/users/[id]", query: { id: String(row.original.id) } });
    const pushOnUserEdit = () => router.push({ pathname: "/admin/users/[id]/edit", query: { id: String(row.original.id) } });

    if (!isRoleOrder) {
        return (
            <MenuDataGrid>
                <MenuItemDataGrid mt={8} onClick={pushOnUserDetail}>
                    <ThemeIcon w={16} h={16} color="primary" variant="outline" sx={{ border: "none" }}>
                        <Eye />
                    </ThemeIcon>
                    Открыть
                </MenuItemDataGrid>
            </MenuDataGrid>
        );
    }
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
            <MenuItemDataGrid mt={8} onClick={pushOnUserDetail}>
                <ThemeIcon w={16} h={16} color="primary" variant="outline" sx={{ border: "none" }}>
                    <Eye />
                </ThemeIcon>
                Открыть
            </MenuItemDataGrid>
            <MenuItemDataGrid onClick={pushOnUserEdit}>
                <ThemeIcon w={16} h={16} color="primary" variant="outline" sx={{ border: "none" }}>
                    <Edit3 />
                </ThemeIcon>
                Редактировать
            </MenuItemDataGrid>
            <MenuItemDataGrid onClick={openModalDeleteUser}>
                <ThemeIcon w={16} h={16} color="primary" variant="outline" sx={{ border: "none" }}>
                    <Trash />
                </ThemeIcon>
                Удалить
            </MenuItemDataGrid>
        </MenuDataGrid>
    );
};

export default UsersListMenu;
