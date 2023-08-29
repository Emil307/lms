import { ThemeIcon } from "@mantine/core";
import { MRT_Row } from "mantine-react-table";
import React from "react";
import { Eye, Trash } from "react-feather";
import { closeModal, openModal } from "@mantine/modals";
import { useRouter } from "next/router";
import { MenuDataGrid, MenuItemDataGrid } from "@shared/ui";
import { AdminCourseFromList } from "@entities/course";
import { DeleteCourseFromCourseCollectionModal } from "@features/courseCollections";

export interface ListMenuProps {
    courseCollectionId: string;
    row: MRT_Row<AdminCourseFromList>;
}

const ListMenu = ({ row, courseCollectionId }: ListMenuProps) => {
    const router = useRouter();
    const handleOpenDetailsPage = () => router.push({ pathname: "/admin/courses/[id]", query: { id: String(row.original.id) } });

    const handleCloseDeleteModal = () => closeModal("DELETE_COURSE_FROM_COURSE_COLLECTION");

    const openDeleteModal = () => {
        openModal({
            modalId: "DELETE_COURSE_FROM_COURSE_COLLECTION",
            title: "Удаление курса",
            children: (
                <DeleteCourseFromCourseCollectionModal
                    id={row.original.id}
                    courseCollectionId={courseCollectionId}
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
            <MenuItemDataGrid onClick={openDeleteModal}>
                <ThemeIcon w={16} h={16} color="primary">
                    <Trash />
                </ThemeIcon>
                Удалить курс из подборки
            </MenuItemDataGrid>
        </MenuDataGrid>
    );
};

export default ListMenu;
