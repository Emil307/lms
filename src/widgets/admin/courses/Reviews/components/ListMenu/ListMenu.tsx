import { Divider, ThemeIcon } from "@mantine/core";
import { MRT_Row } from "mantine-react-table";
import React, { ChangeEvent } from "react";
import { Eye, Trash } from "react-feather";
import { closeModal, openModal } from "@mantine/modals";
import { useRouter } from "next/router";
import { MenuDataGrid, MenuItemDataGrid, Switch } from "@shared/ui";
import { AdminCourseReviewFromList, useUpdateCourseReviewPublishingStatus } from "@entities/courseReview";
import { DeleteCourseReviewModal } from "@features/courseReviews";
import { getFullName } from "@shared/utils";

interface ListMenuProps {
    row: MRT_Row<AdminCourseReviewFromList>;
}

const ListMenu = ({ row }: ListMenuProps) => {
    const router = useRouter();

    const { mutate: updatePublishingStatus } = useUpdateCourseReviewPublishingStatus({ id: String(row.original.id) });

    const labelActivitySwitch = row.original.isPublished ? "Скрыть" : "Опубликовать";

    const handleChangePublishedStatus = (newValue: ChangeEvent<HTMLInputElement>) => {
        updatePublishingStatus({ isPublished: newValue.target.checked });
    };

    const handleCloseDeleteModal = () => closeModal("DELETE_COURSE_REVIEW");

    const openDeleteModal = () => {
        openModal({
            modalId: "DELETE_COURSE_REVIEW",
            title: "Удаление отзыва",
            children: (
                <DeleteCourseReviewModal
                    id={String(row.original.id)}
                    fullName={getFullName({ data: row.original.user.profile })}
                    onSuccess={handleCloseDeleteModal}
                    onCancel={handleCloseDeleteModal}
                />
            ),
        });
    };

    const handleOpenReviewDetail = () => {
        router.push({ pathname: "/admin/settings/course-reviews/[id]", query: { id: String(row.original.id) } });
    };

    return (
        <MenuDataGrid>
            <MenuItemDataGrid closeMenuOnClick={false} py={4}>
                <Switch
                    variant="secondary"
                    checked={row.original.isPublished}
                    label={labelActivitySwitch}
                    labelPosition="left"
                    onChange={handleChangePublishedStatus}
                    w="100%"
                />
            </MenuItemDataGrid>
            <Divider size={1} color="light" mx={12} />
            <MenuItemDataGrid mt={8} onClick={handleOpenReviewDetail}>
                <ThemeIcon w={16} h={16} color="primary">
                    <Eye />
                </ThemeIcon>
                Открыть
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
