import { ThemeIcon } from "@mantine/core";
import { MRT_Row } from "mantine-react-table";
import React from "react";
import { Trash } from "react-feather";
import { closeModal, openModal } from "@mantine/modals";
import { MenuDataGrid, MenuItemDataGrid } from "@shared/ui";
import { useUserRole } from "@entities/auth";
import { DeleteArticleCourseModal } from "@features/articles";
import { AdminCourseFromList } from "@entities/course";
import { Roles } from "@shared/types";

export interface ListMenuProps {
    row: MRT_Row<AdminCourseFromList>;
    articleId: string;
}

const ListMenu = ({ row, articleId }: ListMenuProps) => {
    const userRole = useUserRole();

    const handleCloseDeleteModal = () => closeModal("DELETE_ARTICLE_COURSE");

    const openDeleteModal = () => {
        openModal({
            modalId: "DELETE_ARTICLE_COURSE",
            title: "Удаление связи",
            children: (
                <DeleteArticleCourseModal
                    id={row.original.id}
                    articleId={articleId}
                    name={row.original.name}
                    onClose={handleCloseDeleteModal}
                />
            ),
        });
    };

    if (userRole?.name === Roles.teacher) {
        return null;
    }

    return (
        <MenuDataGrid>
            <MenuItemDataGrid onClick={openDeleteModal}>
                <ThemeIcon w={16} h={16} color="primary">
                    <Trash />
                </ThemeIcon>
                Удалить
            </MenuItemDataGrid>
        </MenuDataGrid>
    );
};

export default ListMenu;
