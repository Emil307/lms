import { Divider, ThemeIcon } from "@mantine/core";
import { MRT_Row } from "mantine-react-table";
import React, { ChangeEvent } from "react";
import { Edit3, Eye, Trash } from "react-feather";
import { closeModal, openModal } from "@mantine/modals";
import { useRouter } from "next/router";
import { MenuDataGrid, MenuItemDataGrid, Switch } from "@shared/ui";
import { AdminLessonFromList, useUpdateLessonActivity } from "@entities/lesson";
import { UpdateLessonModal } from "@features/lessons";
import DeleteLessonModal from "@features/lessons/ui/DeleteLessonModal/DeleteLessonModal";

interface ListMenuProps {
    row: MRT_Row<AdminLessonFromList>;
}

const ListMenu = ({ row }: ListMenuProps) => {
    const router = useRouter();
    const lessonId = String(row.original.id);

    const { mutate: updateActivityStatus } = useUpdateLessonActivity({ id: lessonId });

    const labelActivitySwitch = row.original.isActive ? "Деактивировать" : "Активировать";

    const handleChangeActiveStatus = (newValue: ChangeEvent<HTMLInputElement>) => updateActivityStatus(newValue.target.checked);

    const handleOpenLessonDetail = () => {
        router.push({ pathname: "/admin/lessons/[lessonId]", query: { lessonId } });
    };

    const handleCloseUpdateLessonModal = () => closeModal("UPDATE_LESSON");
    const handleCloseDeleteLessonModal = () => closeModal("DELETE_LESSON");

    const handleOpenDeleteLessonModal = () => {
        openModal({
            modalId: "DELETE_LESSON",
            title: "Удаление урока",
            centered: true,
            children: (
                <DeleteLessonModal
                    id={lessonId}
                    name={row.original.name}
                    onSuccess={handleCloseDeleteLessonModal}
                    onCancel={handleCloseDeleteLessonModal}
                />
            ),
        });
    };

    const handleOpenUpdateLessonModal = () => {
        openModal({
            modalId: "UPDATE_LESSON",
            title: "Редактирование урока",
            centered: true,
            children: <UpdateLessonModal data={row.original} onClose={handleCloseUpdateLessonModal} />,
        });
    };

    return (
        <MenuDataGrid>
            <MenuItemDataGrid closeMenuOnClick={false}>
                <Switch
                    variant="secondary"
                    checked={row.original.isActive}
                    label={labelActivitySwitch}
                    labelPosition="left"
                    onChange={handleChangeActiveStatus}
                />
            </MenuItemDataGrid>

            <Divider size={1} color="light" mx={12} />
            <MenuItemDataGrid mt={8} onClick={handleOpenLessonDetail}>
                <ThemeIcon w={16} h={16} color="primary" variant="outline" sx={{ border: "none" }}>
                    <Eye />
                </ThemeIcon>
                Открыть
            </MenuItemDataGrid>
            <MenuItemDataGrid onClick={handleOpenUpdateLessonModal}>
                <ThemeIcon w={16} h={16} color="primary" variant="outline" sx={{ border: "none" }}>
                    <Edit3 />
                </ThemeIcon>
                Редактировать
            </MenuItemDataGrid>
            <MenuItemDataGrid onClick={handleOpenDeleteLessonModal}>
                <ThemeIcon w={16} h={16} color="primary" variant="outline" sx={{ border: "none" }}>
                    <Trash />
                </ThemeIcon>
                Удалить
            </MenuItemDataGrid>
        </MenuDataGrid>
    );
};

export default ListMenu;
