import { ActionIcon } from "@mantine/core";
import { closeModal, openModal } from "@mantine/modals";
import { Trash } from "react-feather";
import { useRouter } from "next/router";
import { Button } from "@shared/ui";
import { DeleteCourseReviewModal } from "@features/courseReviews";
import { GetAdminCourseReviewResponse } from "@entities/courseReview";
import { getFullName, useMedia } from "@shared/utils";

export interface DeleteCourseReviewButtonProps {
    data?: GetAdminCourseReviewResponse;
}

const DeleteCourseReviewButton = ({ data }: DeleteCourseReviewButtonProps) => {
    const router = useRouter();
    const isMobile = useMedia("sm");

    const closeDeleteModal = () => closeModal("DELETE_COURSE_REVIEW");

    const handleSuccessDelete = () => {
        closeDeleteModal();
        router.push("/admin/settings/course-reviews");
    };

    const handleCancelDelete = () => closeDeleteModal();

    const openDeleteModal = () => {
        openModal({
            modalId: "DELETE_COURSE_REVIEW",
            title: "Удаление отзыва",
            children: (
                <DeleteCourseReviewModal
                    id={String(data?.id)}
                    fullName={getFullName({ data: data?.user.profile })}
                    onSuccess={handleSuccessDelete}
                    onCancel={handleCancelDelete}
                />
            ),
        });
    };

    if (isMobile) {
        return (
            <ActionIcon color="dark" onClick={openDeleteModal}>
                <Trash />
            </ActionIcon>
        );
    }

    return (
        <Button onClick={openDeleteModal} variant="text" leftIcon={<Trash />}>
            Удалить отзыв
        </Button>
    );
};

export default DeleteCourseReviewButton;
