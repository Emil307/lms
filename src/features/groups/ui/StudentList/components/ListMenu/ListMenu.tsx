import { ThemeIcon } from "@mantine/core";
import { MRT_Row } from "mantine-react-table";
import React from "react";
import { Eye, Trash } from "react-feather";
import { IconPercentage } from "@tabler/icons-react";
import { closeModal, openModal } from "@mantine/modals";
import { MenuDataGrid, MenuItemDataGrid } from "@shared/ui";
import { AdminGroupParticipantFromList } from "@entities/group";
import { DeleteStudentFromGroupModal } from "@features/groups";
import { getFullName } from "@shared/utils";

interface ListMenuProps {
    groupId?: string;
    row: MRT_Row<AdminGroupParticipantFromList>;
}

const ListMenu = ({ groupId, row }: ListMenuProps) => {
    //TODO: Добавить методы по статистике и открыть после того как будет готово на бекенде

    const studentFullName = getFullName({ data: row.original.profile });

    const handleCloseDeleteStudentFromGroupModal = () => closeModal("DELETE_STUDENT_FROM_GROUP");

    const openDeleteStudentFromGroupModal = () => {
        openModal({
            modalId: "DELETE_STUDENT_FROM_GROUP",
            title: "Удаление пользователя",
            centered: true,
            children: (
                <DeleteStudentFromGroupModal
                    groupId={groupId}
                    studentId={String(row.original.id)}
                    fullName={studentFullName}
                    onClose={handleCloseDeleteStudentFromGroupModal}
                />
            ),
        });
    };

    return (
        <MenuDataGrid>
            <MenuItemDataGrid mt={8}>
                <ThemeIcon w={16} h={16} color="primary" variant="outline" sx={{ border: "none" }}>
                    <Eye />
                </ThemeIcon>
                Открыть
            </MenuItemDataGrid>
            <MenuItemDataGrid>
                <ThemeIcon w={16} h={16} color="primary" variant="outline" sx={{ border: "none" }}>
                    <IconPercentage />
                </ThemeIcon>
                Статистика
            </MenuItemDataGrid>
            <MenuItemDataGrid onClick={openDeleteStudentFromGroupModal}>
                <ThemeIcon w={16} h={16} color="primary" variant="outline" sx={{ border: "none" }}>
                    <Trash />
                </ThemeIcon>
                Удалить
            </MenuItemDataGrid>
        </MenuDataGrid>
    );
};

export default ListMenu;
