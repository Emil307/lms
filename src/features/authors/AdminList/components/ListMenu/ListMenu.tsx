import { Divider, ThemeIcon } from "@mantine/core";
import { MRT_Row } from "mantine-react-table";
import { useRouter } from "next/router";
import React, { ChangeEvent } from "react";
import { Edit3, Eye, Trash } from "react-feather";
import { closeModal, openModal } from "@mantine/modals";
import { MenuDataGrid, MenuItemDataGrid, Switch } from "@shared/ui";
import { useUpdateAuthorActivity, AdminAuthorFromList } from "@entities/author";
import { DeleteAuthorModal } from "@features/authors";
import { getFullName } from "@shared/utils";

interface ListMenuProps {
    row: MRT_Row<AdminAuthorFromList>;
}

const ListMenu = ({ row }: ListMenuProps) => {
    const router = useRouter();

    const authorName = getFullName({ data: row.original });
    const { mutate: updateActivityStatus } = useUpdateAuthorActivity({ id: row.original.id.toString(), name: authorName });

    const labelActivitySwitch = row.original.isActive ? "Деактивировать" : "Активировать";

    const handleChangeActiveStatus = (newValue: ChangeEvent<HTMLInputElement>) =>
        updateActivityStatus({ isActive: newValue.target.checked });

    const handleCloseDeleteAuthorModal = () => closeModal("DELETE_AUTHOR");

    const openModalDeleteAuthor = () => {
        openModal({
            modalId: "DELETE_AUTHOR",
            title: "Удаление автора",
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
            <MenuItemDataGrid closeMenuOnClick={false} py={4}>
                <Switch
                    variant="secondary"
                    checked={row.original.isActive}
                    label={labelActivitySwitch}
                    labelPosition="left"
                    onChange={handleChangeActiveStatus}
                    w="100%"
                />
            </MenuItemDataGrid>
            <Divider size={1} color="light" mx={12} />
            <MenuItemDataGrid mt={8} onClick={openAuthorDetail}>
                <ThemeIcon w={16} h={16} color="primary">
                    <Eye />
                </ThemeIcon>
                Открыть
            </MenuItemDataGrid>
            <MenuItemDataGrid onClick={opeEditAuthor}>
                <ThemeIcon w={16} h={16} color="primary">
                    <Edit3 />
                </ThemeIcon>
                Редактировать
            </MenuItemDataGrid>
            <MenuItemDataGrid onClick={openModalDeleteAuthor}>
                <ThemeIcon w={16} h={16} color="primary">
                    <Trash />
                </ThemeIcon>
                Удалить
            </MenuItemDataGrid>
        </MenuDataGrid>
    );
};

export default ListMenu;
