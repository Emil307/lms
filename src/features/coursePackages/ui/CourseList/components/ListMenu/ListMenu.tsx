import { ThemeIcon } from "@mantine/core";
import { MRT_Row } from "mantine-react-table";
import React from "react";
import { Eye, Trash } from "react-feather";
import { closeModal, openModal } from "@mantine/modals";
import { useRouter } from "next/router";
import { MenuDataGrid, MenuItemDataGrid } from "@shared/ui";
import { AdminCourseFromList } from "@entities/course";
import { DeleteCourseFromCoursePackageModal } from "@features/coursePackages";

interface ListMenuProps {
    coursePackageId: string;
    row: MRT_Row<AdminCourseFromList>;
}

const ListMenu = ({ row, coursePackageId }: ListMenuProps) => {
    const router = useRouter();

    const handleOpenDetailsPage = () => router.push({ pathname: "/admin/courses/[id]", query: { id: String(row.original.id) } });

    const handleCloseDeleteModal = () => closeModal("DELETE_COURSE_FROM_PACKAGE");

    const openDeleteModal = () => {
        openModal({
            modalId: "DELETE_COURSE_FROM_PACKAGE",
            title: "Удаление курса",
            children: (
                <DeleteCourseFromCoursePackageModal
                    id={row.original.id}
                    coursePackageId={coursePackageId}
                    name={row.original.name}
                    onClose={handleCloseDeleteModal}
                />
            ),
        });
    };

    return (
        <MenuDataGrid>
            <MenuItemDataGrid mt={8} onClick={handleOpenDetailsPage}>
                <ThemeIcon w={16} h={16} color="primary" variant="outline" sx={{ border: "none" }}>
                    <Eye />
                </ThemeIcon>
                Открыть
            </MenuItemDataGrid>
            <MenuItemDataGrid onClick={openDeleteModal}>
                <ThemeIcon w={16} h={16} color="primary" variant="outline" sx={{ border: "none" }}>
                    <Trash />
                </ThemeIcon>
                Удалить
            </MenuItemDataGrid>
        </MenuDataGrid>
    );
};

export default ListMenu;
