import { ThemeIcon } from "@mantine/core";
import { MRT_Row } from "mantine-react-table";
import React from "react";
import { Eye, Trash } from "react-feather";
import { useRouter } from "next/router";
import { closeModal, openModal } from "@mantine/modals";
import { MenuDataGrid, MenuItemDataGrid } from "@shared/ui";
import { AdminStudentArticlePackageFromList } from "@entities/articlePackage";
import { DeleteStudentArticlePackageModal } from "@features/articlePackages";

export interface ListMenuProps {
    row: MRT_Row<AdminStudentArticlePackageFromList>;
    studentId: string;
}

const ListMenu = ({ row, studentId }: ListMenuProps) => {
    const router = useRouter();

    const handleOpenDetailsPage = () =>
        router.push({ pathname: "/admin/settings/article-packages/[id]", query: { id: String(row.original.id) } });

    const handleCloseDeleteModal = () => closeModal("DELETE_STUDENT_ARTICLE_PACKAGE");

    const openDeleteModal = () => {
        openModal({
            modalId: "DELETE_STUDENT_ARTICLE_PACKAGE",
            title: "Удаление доступа",
            children: (
                <DeleteStudentArticlePackageModal
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
