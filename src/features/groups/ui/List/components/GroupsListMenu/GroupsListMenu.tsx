import { Box, ThemeIcon, useMantineTheme } from "@mantine/core";
import { MRT_Row } from "mantine-react-table";
import { useRouter } from "next/router";
import React from "react";
import { Edit3, Eye, Trash } from "react-feather";
import { closeModal, openModal } from "@mantine/modals";
import { MenuDataGrid, MenuItemDataGrid, Switch } from "@shared/ui";
import { Group, useActivateGroup, useDeactivateGroup } from "@entities/group";
import { DeleteGroupModal } from "@features/groups";

interface GroupsListMenuProps {
    row: MRT_Row<Group>;
}

const GroupsListMenu = ({ row }: GroupsListMenuProps) => {
    const router = useRouter();
    const theme = useMantineTheme();
    const { mutate: activate } = useActivateGroup(String(row.original.id));
    const { mutate: deactivate } = useDeactivateGroup(String(row.original.id));

    const handleChangeActiveStatus = () => {
        if (row.original.isActive) {
            return deactivate();
        }
        return activate();
    };

    const handleCloseDeleteGroupModal = () => closeModal("DELETE_GROUP");

    const openModalDeleteGroup = (id: string, groupName: string) => {
        openModal({
            modalId: "DELETE_GROUP",
            title: "Удаление группы",
            centered: true,
            children: <DeleteGroupModal id={id} name={groupName} onClose={handleCloseDeleteGroupModal} />,
        });
    };

    const handleOpenGroupDetail = () => router.push({ pathname: "/admin/groups/[id]", query: { id: String(row.original.id) } });
    const handleOpenEditGroup = () => router.push({ pathname: "/admin/groups/[id]/edit", query: { id: String(row.original.id) } });

    return (
        <MenuDataGrid>
            <MenuItemDataGrid onClick={handleChangeActiveStatus} closeMenuOnClick={false}>
                Деактивировать <Switch variant="secondary" checked={row.original.isActive} />
            </MenuItemDataGrid>
            <Box
                sx={{
                    height: 1,
                    backgroundColor: theme.colors.light[0],
                    margin: "0 12px",
                }}></Box>
            <MenuItemDataGrid mt={8} onClick={handleOpenGroupDetail}>
                <ThemeIcon w={16} h={16} color="primary" variant="outline" sx={{ border: "none" }}>
                    <Eye />
                </ThemeIcon>
                Открыть
            </MenuItemDataGrid>
            <MenuItemDataGrid onClick={handleOpenEditGroup}>
                <ThemeIcon w={16} h={16} color="primary" variant="outline" sx={{ border: "none" }}>
                    <Edit3 />
                </ThemeIcon>
                Редактировать
            </MenuItemDataGrid>
            <MenuItemDataGrid onClick={() => openModalDeleteGroup(String(row.original.id), row.original.name)}>
                <ThemeIcon w={16} h={16} color="primary" variant="outline" sx={{ border: "none" }}>
                    <Trash />
                </ThemeIcon>
                Удалить
            </MenuItemDataGrid>
        </MenuDataGrid>
    );
};

export default GroupsListMenu;
