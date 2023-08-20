import { ActionIcon } from "@mantine/core";
import { closeModal, openModal } from "@mantine/modals";
import { Trash } from "react-feather";
import { useRouter } from "next/router";
import { Button } from "@shared/ui";
import { DeleteCourseCollectionModal } from "@features/courseCollections";
import { GetAdminCourseCollectionResponse } from "@entities/courseCollection";
import { useMedia } from "@shared/utils";

export interface DeleteCourseCollectionButtonProps {
    data?: GetAdminCourseCollectionResponse;
}

const DeleteCourseCollectionButton = ({ data }: DeleteCourseCollectionButtonProps) => {
    const router = useRouter();
    const isMobile = useMedia("sm");

    const closeDeleteCourseCollectionModal = () => closeModal("DELETE_COURSE_COLLECTION");

    const handleSuccessDelete = () => {
        closeDeleteCourseCollectionModal();
        router.push("/admin/settings/course-collections");
    };

    const handleCancelDelete = () => closeDeleteCourseCollectionModal();

    const openDeleteModal = () => {
        openModal({
            modalId: "DELETE_COURSE_COLLECTION",
            title: "Удаление подборки",
            children: (
                <DeleteCourseCollectionModal
                    id={String(data?.id)}
                    name={data?.name}
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
            Удалить подборку
        </Button>
    );
};

export default DeleteCourseCollectionButton;
