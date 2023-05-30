import { ThemeIcon } from "@mantine/core";
import { MRT_Row } from "mantine-react-table";
import React from "react";
import { Eye, Trash } from "react-feather";
import { closeModal, openModal } from "@mantine/modals";
import { MenuDataGrid, MenuItemDataGrid } from "@shared/ui";
import { AdminCourseFromList } from "@entities/course";
import { DeleteCourseFromCoursePackageModal } from "@features/coursePackages";

interface ListMenuProps {
    coursePackageId: string;
    row: MRT_Row<AdminCourseFromList>;
}

const ListMenu = ({ row, coursePackageId }: ListMenuProps) => {
    //TODO: Добавить редирект после того как будет готова детальная страница курса в админке
    const handleOpenDetailPage = () => undefined;

    const handleCloseDeleteModal = () => closeModal("DELETE_COURSE_FROM_PACKAGE");

    const openDeleteModal = () => {
        openModal({
            modalId: "DELETE_COURSE_FROM_PACKAGE",
            title: "Удаление курса",
            centered: true,
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
            <MenuItemDataGrid mt={8} onClick={handleOpenDetailPage}>
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