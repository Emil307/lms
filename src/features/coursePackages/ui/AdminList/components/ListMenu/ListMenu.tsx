import { Divider, ThemeIcon } from "@mantine/core";
import { MRT_Row } from "mantine-react-table";
import React, { ChangeEvent } from "react";
import { Edit3, Eye, Trash } from "react-feather";
import { closeModal, openModal } from "@mantine/modals";
import { useRouter } from "next/router";
import { MenuDataGrid, MenuItemDataGrid, Switch } from "@shared/ui";
import { AdminCoursePackageFromList, useUpdateCoursePackageActivity } from "@entities/coursePackage";
import { DeleteCoursePackageModal } from "@features/coursePackages";

interface ListMenuProps {
    row: MRT_Row<AdminCoursePackageFromList>;
}

const ListMenu = ({ row }: ListMenuProps) => {
    const router = useRouter();
    const { mutate: updateActivityStatus } = useUpdateCoursePackageActivity(String(row.original.id));

    const labelActivitySwitch = row.original.isActive ? "Деактивировать" : "Активировать";

    const handleChangeActiveStatus = (newValue: ChangeEvent<HTMLInputElement>) => updateActivityStatus(newValue.target.checked);

    const handleCloseDeleteModal = () => closeModal("DELETE_COURSE_PACKAGE");

    const openDeleteModal = () => {
        openModal({
            modalId: "DELETE_COURSE_PACKAGE",
            title: "Удаление пакета",
            children: <DeleteCoursePackageModal id={String(row.original.id)} name={row.original.name} onSuccess={handleCloseDeleteModal} onCancel={handleCloseDeleteModal} />,
        });
    };

    const handleOpenDetailPage = () =>
        router.push({ pathname: "/admin/settings/course-packages/[id]", query: { id: row.original.id.toString() } });
    const handleOpenEditPage = () =>
        router.push({ pathname: "/admin/settings/course-packages/[id]/edit", query: { id: row.original.id.toString() } });

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
            <MenuItemDataGrid mt={8} onClick={handleOpenDetailPage}>
                <ThemeIcon w={16} h={16} color="primary">
                    <Eye />
                </ThemeIcon>
                Открыть
            </MenuItemDataGrid>
            <MenuItemDataGrid onClick={handleOpenEditPage}>
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
