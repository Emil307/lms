import { Divider, ThemeIcon } from "@mantine/core";
import { MRT_Row } from "mantine-react-table";
import React, { ChangeEvent } from "react";
import { Edit3, Eye, Trash } from "react-feather";
import { closeModal, openModal } from "@mantine/modals";
import { useRouter } from "next/router";
import { MenuDataGrid, MenuItemDataGrid, Switch } from "@shared/ui";
import { AdminCourseCollectionFromList, useAdminUpdateCourseCollectionActivity } from "@entities/courseCollection";
import { DeleteCourseCollectionModal } from "@features/courseCollections/DeleteCourseCollectionModal";

interface ListMenuProps {
    row: MRT_Row<AdminCourseCollectionFromList>;
}

const ListMenu = ({ row }: ListMenuProps) => {
    const router = useRouter();
    const { mutate: updateActivityStatus } = useAdminUpdateCourseCollectionActivity({ id: String(row.original.id) });

    const labelActivitySwitch = row.original.isActive ? "Деактивировать" : "Активировать";

    const handleChangeActiveStatus = (newValue: ChangeEvent<HTMLInputElement>) =>
        updateActivityStatus({ isActive: newValue.target.checked });

    const handleCloseDeleteModal = () => closeModal("DELETE_COURSE_COLLECTION");

    const openDeleteModal = () => {
        openModal({
            modalId: "DELETE_COURSE_COLLECTION",
            title: "Удаление пакета",
            children: (
                <DeleteCourseCollectionModal
                    id={String(row.original.id)}
                    name={row.original.name}
                    onSuccess={handleCloseDeleteModal}
                    onCancel={handleCloseDeleteModal}
                />
            ),
        });
    };

    const handleOpenDetailsPage = () =>
        router.push({ pathname: "/admin/settings/course-collections/[id]", query: { id: String(row.original.id) } });

    const handleOpenUpdatePage = () =>
        router.push({ pathname: "/admin/settings/course-collections/[id]/edit", query: { id: String(row.original.id) } });

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
            <MenuItemDataGrid mt={8} onClick={handleOpenDetailsPage}>
                <ThemeIcon w={16} h={16} color="primary">
                    <Eye />
                </ThemeIcon>
                Открыть
            </MenuItemDataGrid>
            <MenuItemDataGrid onClick={handleOpenUpdatePage}>
                <ThemeIcon w={16} h={16} color="primary">
                    <Edit3 />
                </ThemeIcon>
                Редактировать
            </MenuItemDataGrid>
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
