import { ThemeIcon } from "@mantine/core";
import { MRT_Row } from "mantine-react-table";
import React from "react";
import { Edit3, Trash } from "react-feather";
import { closeModal, openModal } from "@mantine/modals";
import { useRouter } from "next/router";
import { MenuDataGrid, MenuItemDataGrid } from "@shared/ui";
import { DeleteScheduleModal, UpdateScheduleForm } from "@features/groups";
import { AdminGroupScheduleFromList } from "@entities/group";
import { TRouterQueries } from "@shared/types";

interface ListMenuProps {
    row: MRT_Row<AdminGroupScheduleFromList>;
}

const ListMenu = ({ row }: ListMenuProps) => {
    const router = useRouter();
    const { id: groupId } = router.query as TRouterQueries;

    const handleCloseDeleteScheduleModal = () => closeModal("DELETE_SCHEDULE");
    const handleCloseUpdateScheduleModal = () => closeModal("UPDATE_SCHEDULE");

    const openDeleteScheduleModal = () => {
        openModal({
            modalId: "DELETE_SCHEDULE",
            title: "Удаление занятия",
            centered: true,
            children: <DeleteScheduleModal groupId={groupId} data={row.original} onClose={handleCloseDeleteScheduleModal} />,
        });
    };

    const openUpdateScheduleModal = () => {
        openModal({
            modalId: "UPDATE_SCHEDULE",
            title: "Редактирование",
            centered: true,
            children: <UpdateScheduleForm groupId={groupId} data={row.original} onClose={handleCloseUpdateScheduleModal} />,
        });
    };
    return (
        <MenuDataGrid>
            <MenuItemDataGrid onClick={openUpdateScheduleModal}>
                <ThemeIcon w={16} h={16} color="primary" variant="outline" sx={{ border: "none" }}>
                    <Edit3 />
                </ThemeIcon>
                Редактировать
            </MenuItemDataGrid>
            <MenuItemDataGrid onClick={openDeleteScheduleModal}>
                <ThemeIcon w={16} h={16} color="primary" variant="outline" sx={{ border: "none" }}>
                    <Trash />
                </ThemeIcon>
                Удалить
            </MenuItemDataGrid>
        </MenuDataGrid>
    );
};

export default ListMenu;
