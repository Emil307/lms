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
import { useUserRole } from "@entities/auth/hooks";
import { Roles } from "@app/routes";

interface ListMenuProps {
    groupId: string;
    row: MRT_Row<AdminGroupStudentFromList>;
}

const ListMenu = ({ groupId, row }: ListMenuProps) => {
    const router = useRouter();

    const userRole = useUserRole();

    const studentFullName = getFullName({ data: row.original.profile });

    const handleOpenStudentDetailsPage = () => router.push({ pathname: "/admin/students/[id]", query: { id: String(row.original.id) } });

    const handleOpenStudentStatisticsPage = () =>
        router.push({ pathname: "/admin/groups/[id]/statistics/[studentId]", query: { id: groupId, studentId: String(row.original.id) } });

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
            <MenuItemDataGrid onClick={handleOpenStudentDetailsPage}>
                <ThemeIcon w={16} h={16} color="primary">
                    <Eye />
                </ThemeIcon>
                Открыть
            </MenuItemDataGrid>
            <MenuItemDataGrid onClick={handleOpenStudentStatisticsPage}>
                <ThemeIcon w={16} h={16} color="primary">
                    <IconPercentage />
                </ThemeIcon>
                Статистика
            </MenuItemDataGrid>
            {userRole !== Roles.teacher && (
                <MenuItemDataGrid onClick={openDeleteStudentFromGroupModal}>
                    <ThemeIcon w={16} h={16} color="primary">
                        <Trash />
                    </ThemeIcon>
                    Удалить
                </MenuItemDataGrid>
            )}
        </MenuDataGrid>
    );
};

export default ListMenu;
