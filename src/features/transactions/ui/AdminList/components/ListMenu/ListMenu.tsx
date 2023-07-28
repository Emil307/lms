import { ThemeIcon } from "@mantine/core";
import { MRT_Row } from "mantine-react-table";
import React from "react";
import { Edit3, Eye, Trash } from "react-feather";
import { closeModal, openModal } from "@mantine/modals";
import { useRouter } from "next/router";
import { MenuDataGrid, MenuItemDataGrid } from "@shared/ui";
import { AdminTransactionFromList } from "@entities/transaction";
import { DeleteTransactionModal } from "@features/transactions";

interface ListMenuProps {
    row: MRT_Row<AdminTransactionFromList>;
}

const ListMenu = ({ row }: ListMenuProps) => {
    const router = useRouter();

    const handleCloseDeleteModal = () => closeModal("DELETE_TRANSACTION");

    const openDeleteModal = () => {
        openModal({
            modalId: "DELETE_TRANSACTION",
            title: "Удаление транзакции",
            children: (
                <DeleteTransactionModal
                    id={String(row.original.id)}
                    name={row.original.entity.type.name}
                    onClose={handleCloseDeleteModal}
                />
            ),
        });
    };

    const handleOpenTransactionDetails = () =>
        router.push({ pathname: "/admin/transactions/[id]", query: { id: String(row.original.id) } });
    const handleOpenUpdateTransaction = () =>
        router.push({ pathname: "/admin/transactions/[id]/edit", query: { id: String(row.original.id) } });

    return (
        <MenuDataGrid>
            <MenuItemDataGrid mt={8} onClick={handleOpenTransactionDetails}>
                <ThemeIcon w={16} h={16} color="primary" variant="outline" sx={{ border: "none" }}>
                    <Eye />
                </ThemeIcon>
                Открыть
            </MenuItemDataGrid>
            <MenuItemDataGrid onClick={handleOpenUpdateTransaction}>
                <ThemeIcon w={16} h={16} color="primary" variant="outline" sx={{ border: "none" }}>
                    <Edit3 />
                </ThemeIcon>
                Редактировать
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
