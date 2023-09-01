import { ThemeIcon } from "@mantine/core";
import { MRT_Row } from "mantine-react-table";
import React from "react";
import { Eye, Trash } from "react-feather";
import { closeModal, openModal } from "@mantine/modals";
import { useRouter } from "next/router";
import { MenuDataGrid, MenuItemDataGrid } from "@shared/ui";
import { AdminStudentCourseFromList } from "@entities/course";
import { DeleteStudentCourseModal } from "@features/courses";
import { useUserRole } from "@entities/auth/hooks";
import { Roles } from "@app/routes";
import { IconPercentage } from "@tabler/icons-react";

export interface ListMenuProps {
    row: MRT_Row<AdminStudentCourseFromList>;
    studentId: string;
}

const ListMenu = ({ row, studentId }: ListMenuProps) => {
    const router = useRouter();

    const userRole = useUserRole();

    const handleOpenDetailsPage = () => router.push({ pathname: "/admin/courses/[id]", query: { id: String(row.original.id) } });

    const handleOpenStudentStatisticsPage = () => {
        router.push({ pathname: "/admin/students/[id]/statistics/[groupId]", query: { id: studentId, groupId: String(row.original.groupId) } });
    }

    const handleCloseDeleteModal = () => closeModal("DELETE_STUDENT_COURSE");

    const openDeleteModal = () => {
        openModal({
            modalId: "DELETE_STUDENT_COURSE",
            title: "Удаление доступа",
            children: (
                <DeleteStudentCourseModal
                    id={row.original.id}
                    studentId={studentId}
                    name={row.original.name}
                    onClose={handleCloseDeleteModal}
                />
            ),
        });
    };

    return (
        <MenuDataGrid>
            <MenuItemDataGrid onClick={handleOpenDetailsPage}>
                <ThemeIcon w={16} h={16} color="primary">
                    <Eye />
                </ThemeIcon>
                Открыть
            </MenuItemDataGrid>
            {row.original.groupId &&
                <MenuItemDataGrid onClick={handleOpenStudentStatisticsPage}>
                    <ThemeIcon w={16} h={16} color="primary">
                        <IconPercentage />
                    </ThemeIcon>
                    Статистика
                </MenuItemDataGrid>
            }
            {userRole !== Roles.teacher && (
                <MenuItemDataGrid onClick={openDeleteModal}>
                    <ThemeIcon w={16} h={16} color="primary">
                        <Trash />
                    </ThemeIcon>
                    Удалить доступ
                </MenuItemDataGrid>
            )}
        </MenuDataGrid>
    );
};

export default ListMenu;
