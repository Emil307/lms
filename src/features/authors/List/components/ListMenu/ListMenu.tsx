import { ThemeIcon } from "@mantine/core";
import { MRT_Row } from "mantine-react-table";
import { useRouter } from "next/router";
import React from "react";
import { Edit3, Eye, Trash } from "react-feather";
import { closeModal, openModal } from "@mantine/modals";
import { MenuDataGrid, MenuItemDataGrid } from "@shared/ui";
import { Author } from "@entities/author";
import { DeleteAuthorModal } from "@features/authors";

interface ListMenuProps {
    row: MRT_Row<Author>;
}

const ListMenu = ({ row }: ListMenuProps) => {
    const router = useRouter();

    const handleCloseDeleteAuthorModal = () => closeModal("DELETE_AUTHOR");

    const openModalDeleteAuthor = () => {
        openModal({
            modalId: "DELETE_AUTHOR",
            title: "Удаление автора",
            centered: true,
            children: (
                <DeleteAuthorModal
                    id={String(row.original.id)}
                    fullName={`${row.original.firstName} ${row.original.lastName}`}
                    onClose={handleCloseDeleteAuthorModal}
                />
            ),
        });
    };

    const openAuthorDetail = () => router.push({ pathname: "/admin/settings/authors/[id]", query: { id: String(row.original.id) } });
    const opeEditAuthor = () => router.push({ pathname: "/admin/settings/authors/[id]/edit", query: { id: String(row.original.id) } });

    return (
        <MenuDataGrid>
            <MenuItemDataGrid mt={8} onClick={openAuthorDetail}>
                <ThemeIcon w={16} h={16} color="primary" variant="outline" sx={{ border: "none" }}>
                    <Eye />
                </ThemeIcon>
                Открыть
            </MenuItemDataGrid>
            <MenuItemDataGrid onClick={opeEditAuthor}>
                <ThemeIcon w={16} h={16} color="primary" variant="outline" sx={{ border: "none" }}>
                    <Edit3 />
                </ThemeIcon>
                Редактировать
            </MenuItemDataGrid>
            <MenuItemDataGrid onClick={openModalDeleteAuthor}>
                <ThemeIcon w={16} h={16} color="primary" variant="outline" sx={{ border: "none" }}>
                    <Trash />
                </ThemeIcon>
                Удалить
            </MenuItemDataGrid>
        </MenuDataGrid>
    );
};

export default ListMenu;
