import { ThemeIcon } from "@mantine/core";
import { MRT_Row } from "mantine-react-table";
import React from "react";
import { Eye, Trash } from "react-feather";
import { IconPercentage } from "@tabler/icons-react";
import { closeModal, openModal } from "@mantine/modals";
import { useRouter } from "next/router";
import { MenuDataGrid, MenuItemDataGrid } from "@shared/ui";
import { AdminGroupStudentFromList } from "@entities/group";
import { DeleteStudentFromGroupModal } from "@features/groups";
import { getFullName } from "@shared/utils";

interface ListMenuProps {
    groupId?: string;
    row: MRT_Row<AdminGroupStudentFromList>;
}

const ListMenu = ({ groupId, row }: ListMenuProps) => {
    const router = useRouter();
    //TODO: Добавить метод по статистике после того как будет готово на бекенде

    const studentFullName = getFullName({ data: row.original.profile });

    const handleOpenStudentDetailsPage = () => router.push({ pathname: "/admin/students/[id]", query: { id: String(row.original.id) } });

    const handleCloseDeleteStudentFromGroupModal = () => closeModal("DELETE_STUDENT_FROM_GROUP");

    const openDeleteStudentFromGroupModal = () => {
        openModal({
            modalId: "DELETE_STUDENT_FROM_GROUP",
            title: "Удаление пользователя",
            children: (
                <DeleteStudentFromGroupModal
                    groupId={groupId}
                    studentId={row.original.id}
                    fullName={studentFullName}
                    onClose={handleCloseDeleteStudentFromGroupModal}
                />
            ),
        });
    };

    return (
        <MenuDataGrid>
            <MenuItemDataGrid mt={8} onClick={handleOpenStudentDetailsPage}>
                <ThemeIcon w={16} h={16} color="primary">
                    <Eye />
                </ThemeIcon>
                Открыть
            </MenuItemDataGrid>
            <MenuItemDataGrid>
                <ThemeIcon w={16} h={16} color="primary">
                    <IconPercentage />
                </ThemeIcon>
                Статистика
            </MenuItemDataGrid>
            <MenuItemDataGrid onClick={openDeleteStudentFromGroupModal}>
                <ThemeIcon w={16} h={16} color="primary">
                    <Trash />
                </ThemeIcon>
                Удалить
            </MenuItemDataGrid>
        </MenuDataGrid>
    );
};

export default ListMenu;
