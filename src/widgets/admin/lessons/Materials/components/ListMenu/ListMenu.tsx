import { ThemeIcon } from "@mantine/core";
import { MRT_Row } from "mantine-react-table";
import React from "react";
import { Download, Trash } from "react-feather";
import { closeModal, openModal } from "@mantine/modals";
import { saveAs } from "file-saver";
import { MenuDataGrid, MenuItemDataGrid } from "@shared/ui";
import { UploadedFileFromList } from "@entities/storage";
import { DeleteMaterialFromLessonModal } from "@features/lessons";

interface LessonMaterialsListMenuProps {
    row: MRT_Row<UploadedFileFromList>;
    lessonId: string;
    lessonName: string;
}

const ListMenu = ({ row, lessonId, lessonName }: LessonMaterialsListMenuProps) => {
    const handleCloseDeleteModal = () => closeModal("DETACH_MATERIAL_FROM_LESSON");

    const handleOpenDeleteModal = () => {
        openModal({
            modalId: "DETACH_MATERIAL_FROM_LESSON",
            title: "Удаление материала",
            children: (
                <DeleteMaterialFromLessonModal
                    materialId={String(row.original.id)}
                    materialName={row.original.name}
                    lessonId={lessonId}
                    lessonName={lessonName}
                    onClose={handleCloseDeleteModal}
                />
            ),
        });
    };

    const handleDownload = () => saveAs(row.original.absolutePath, row.original.name);

    return (
        <MenuDataGrid>
            <MenuItemDataGrid onClick={handleDownload}>
                <ThemeIcon w={16} h={16} color="primary">
                    <Download />
                </ThemeIcon>
                Скачать
            </MenuItemDataGrid>
            <MenuItemDataGrid onClick={handleOpenDeleteModal}>
                <ThemeIcon w={16} h={16} color="primary">
                    <Trash />
                </ThemeIcon>
                Удалить
            </MenuItemDataGrid>
        </MenuDataGrid>
    );
};

export default ListMenu;
