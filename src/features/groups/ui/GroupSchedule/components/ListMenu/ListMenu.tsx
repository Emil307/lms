import { ThemeIcon } from "@mantine/core";
import { MRT_Row } from "mantine-react-table";
import React from "react";
import { Edit3, Trash } from "react-feather";
import { closeModal, openModal } from "@mantine/modals";
import { useRouter } from "next/router";
import { MenuDataGrid, MenuItemDataGrid } from "@shared/ui";
import { ScheduleLine } from "@entities/group";
import { DeleteScheduleModal, EditScheduleForm } from "@features/groups";

interface ListMenuProps {
    row: MRT_Row<ScheduleLine>;
}

const ListMenu = ({ row }: ListMenuProps) => {
    const router = useRouter();

    const handleCloseDeleteScheduleModal = () => closeModal("DELETE_SCHEDULE");
    const handleCloseEditScheduleModal = () => closeModal("EDIT_SCHEDULE");

    const openModalDeleteSchedule = () => {
        openModal({
            modalId: "DELETE_SCHEDULE",
            title: "Удаление занятия",
            centered: true,
            children: (
                <DeleteScheduleModal groupId={String(router.query.id)} data={row.original} onClose={handleCloseDeleteScheduleModal} />
            ),
        });
    };

    const openModalEditSchedule = () => {
        openModal({
            modalId: "EDIT_SCHEDULE",
            title: "Редактирование",
            centered: true,
            children: <EditScheduleForm groupId={String(router.query.id)} data={row.original} onClose={handleCloseEditScheduleModal} />,
        });
    };
    return (
        <MenuDataGrid>
            <MenuItemDataGrid onClick={openModalEditSchedule}>
                <ThemeIcon w={16} h={16} color="primary" variant="outline" sx={{ border: "none" }}>
                    <Edit3 />
                </ThemeIcon>
                Редактировать
            </MenuItemDataGrid>
            <MenuItemDataGrid onClick={openModalDeleteSchedule}>
                <ThemeIcon w={16} h={16} color="primary" variant="outline" sx={{ border: "none" }}>
                    <Trash />
                </ThemeIcon>
                Удалить
            </MenuItemDataGrid>
        </MenuDataGrid>
    );
};

export default ListMenu;
