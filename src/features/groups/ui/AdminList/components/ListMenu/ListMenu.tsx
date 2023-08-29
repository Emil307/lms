import { Divider, ThemeIcon } from "@mantine/core";
import { MRT_Row } from "mantine-react-table";
import { useRouter } from "next/router";
import React, { ChangeEvent } from "react";
import { Edit3, Eye, Trash } from "react-feather";
import { closeModal, openModal } from "@mantine/modals";
import { useUserRole } from "@entities/auth";
import { MenuDataGrid, MenuItemDataGrid, Switch } from "@shared/ui";
import { AdminGroupFromList, useUpdateGroupActivity } from "@entities/group";
import { DeleteGroupModal } from "@features/groups";
import { Roles } from "@app/routes";

export interface ListMenuProps {
    row: MRT_Row<AdminGroupFromList>;
}

const ListMenu = ({ row }: ListMenuProps) => {
    const router = useRouter();

    const userRole = useUserRole();

    const { mutate: updateActivityStatus } = useUpdateGroupActivity({ id: row.original.id.toString(), name: row.original.name });

    const labelActivitySwitch = row.original.isActive ? "Деактивировать" : "Активировать";

    const handleChangeActiveStatus = (newValue: ChangeEvent<HTMLInputElement>) =>
        updateActivityStatus({ isActive: newValue.target.checked });

    const handleCloseDeleteModal = () => {
        closeModal("DELETE_GROUP");
        router.push("/admin/groups");
    };

    const openDeleteModal = () => {
        openModal({
            modalId: "DELETE_GROUP",
            title: "Удаление группы",
            children: (
                <DeleteGroupModal
                    id={row.original.id.toString()}
                    name={row.original.name}
                    onSuccess={handleCloseDeleteModal}
                    onCancel={handleCloseDeleteModal}
                />
            ),
        });
    };

    const handleOpenGroupDetails = () => router.push({ pathname: "/admin/groups/[id]", query: { id: String(row.original.id) } });
    const handleOpenUpdateGroupForm = () => router.push({ pathname: "/admin/groups/[id]/edit", query: { id: String(row.original.id) } });

    const renderItems = () => {
        if (userRole === Roles.teacher) {
            return (
                <MenuItemDataGrid onClick={handleOpenGroupDetails}>
                    <ThemeIcon w={16} h={16} color="primary">
                        <Eye />
                    </ThemeIcon>
                    Открыть
                </MenuItemDataGrid>
            );
        }
        return (
            <>
                <MenuItemDataGrid closeMenuOnClick={false} py={4}>
                    <Switch
                        variant="secondary"
                        checked={row.original.isActive}
                        label={labelActivitySwitch}
                        labelPosition="left"
                        onChange={handleChangeActiveStatus}
                        w="100%"
                    />
                </MenuItemDataGrid>
                <Divider size={1} color="light" mx={12} />

                <MenuItemDataGrid mt={8} onClick={handleOpenGroupDetails}>
                    <ThemeIcon w={16} h={16} color="primary">
                        <Eye />
                    </ThemeIcon>
                    Открыть
                </MenuItemDataGrid>

                <MenuItemDataGrid onClick={handleOpenUpdateGroupForm}>
                    <ThemeIcon w={16} h={16} color="primary">
                        <Edit3 />
                    </ThemeIcon>
                    Редактировать
                </MenuItemDataGrid>
                <MenuItemDataGrid onClick={openDeleteModal}>
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
