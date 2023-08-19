import { Divider, ThemeIcon } from "@mantine/core";
import { MRT_Row } from "mantine-react-table";
import { useRouter } from "next/router";
import React, { ChangeEvent } from "react";
import { Edit3, Eye, Trash } from "react-feather";
import { closeModal, openModal } from "@mantine/modals";
import { UserFromList, useUpdateUserActivity } from "@entities/user";
import { MenuDataGrid, MenuItemDataGrid, Switch } from "@shared/ui";
import { UserDeleteModal } from "@features/users";
import { checkRoleOrder, getFullName } from "@shared/utils";
import { useSession } from "@features/auth";

export interface ListMenuProps {
    row: MRT_Row<UserFromList>;
}

const ListMenu = ({ row }: ListMenuProps) => {
    const router = useRouter();
    const { user } = useSession();

    const isRoleOrder = checkRoleOrder(user?.roles[0].id, row.original.roles[0].id) >= 0;
    const userFullname = getFullName({ data: row.original.profile });

    const { mutate: updateActivityStatus } = useUpdateUserActivity({ id: String(row.original.id), fio: userFullname });

    const labelActivitySwitch = row.original.isActive ? "Деактивировать" : "Активировать";

    const handleChangeActiveStatus = (newValue: ChangeEvent<HTMLInputElement>) => updateActivityStatus(newValue.target.checked);

    const handleCloseDeleteModal = () => closeModal("DELETE_USER");

    const handleOpenDeleteModal = () => {
        openModal({
            modalId: "DELETE_USER",
            title: "Удаление пользователя",
            children: <UserDeleteModal id={String(row.original.id)} fio={userFullname} onClose={handleCloseDeleteModal} />,
        });
    };

    const pushOnUserDetail = () => router.push({ pathname: "/admin/users/[id]", query: { id: String(row.original.id) } });
    const pushOnUserEdit = () => router.push({ pathname: "/admin/users/[id]/edit", query: { id: String(row.original.id) } });

    if (!isRoleOrder) {
        return (
            <MenuDataGrid>
                <MenuItemDataGrid mt={8} onClick={pushOnUserDetail}>
                    <ThemeIcon w={16} h={16} color="primary">
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
                <ThemeIcon w={16} h={16} color="primary">
                    <Eye />
                </ThemeIcon>
                Открыть
            </MenuItemDataGrid>
            <MenuItemDataGrid onClick={pushOnUserEdit}>
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
        </MenuDataGrid>
    );
};

export default ListMenu;
