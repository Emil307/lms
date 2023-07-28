import { ActionIcon } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { closeModal, openModal } from "@mantine/modals";
import { Trash } from "react-feather";
import { useRouter } from "next/router";
import { Button } from "@shared/ui";
import { DeleteCourseCollectionModal } from "@features/courseCollections";
import { GetAdminCourseCollectionResponse } from "@entities/courseCollection";

export interface DeleteCourseCollectionButtonProps {
    data?: GetAdminCourseCollectionResponse;
}

const DeleteCourseCollectionButton = ({ data }: DeleteCourseCollectionButtonProps) => {
    const router = useRouter();
    const isMobile = useMediaQuery("(max-width: 744px)");

    const handleCloseDeleteModal = () => {
        closeModal("DELETE_COURSE_COLLECTION");
        router.push("/admin/settings/course-collections");
    };

    const openDeleteModal = () => {
        openModal({
            modalId: "DELETE_COURSE_COLLECTION",
            title: "Удаление подборки",
            children: <DeleteCourseCollectionModal id={String(data?.id)} name={data?.name} onClose={handleCloseDeleteModal} />,
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
