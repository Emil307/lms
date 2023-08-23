import { ThemeIcon } from "@mantine/core";
import { MRT_Row } from "mantine-react-table";
import React from "react";
import { Eye, Trash } from "react-feather";
import { closeModal, openModal } from "@mantine/modals";
import { useRouter } from "next/router";
import { MenuDataGrid, MenuItemDataGrid } from "@shared/ui";
import { AdminStudentCourseFromList } from "@entities/course";
import { DeleteStudentCourseModal } from "@features/courses";

export interface ListMenuProps {
    row: MRT_Row<AdminStudentCourseFromList>;
    studentId: string;
}

const ListMenu = ({ row, studentId }: ListMenuProps) => {
    const router = useRouter();

    const handleOpenDetailsPage = () => router.push({ pathname: "/admin/courses/[id]", query: { id: String(row.original.id) } });

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
            <MenuItemDataGrid mt={8} onClick={handleOpenDetailsPage}>
                <ThemeIcon w={16} h={16} color="primary">
                    <Eye />
                </ThemeIcon>
                Открыть
            </MenuItemDataGrid>
            {/* //TODO: Добавить статистику курса */}
            <MenuItemDataGrid onClick={openDeleteModal}>
                <ThemeIcon w={16} h={16} color="primary">
                    <Trash />
                </ThemeIcon>
                Удалить доступ
            </MenuItemDataGrid>
        </MenuDataGrid>
    );
};

export default ListMenu;
