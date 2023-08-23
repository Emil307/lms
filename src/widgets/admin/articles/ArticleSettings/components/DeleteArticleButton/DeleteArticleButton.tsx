import { ActionIcon } from "@mantine/core";
import { closeModal, openModal } from "@mantine/modals";
import { Trash } from "react-feather";
import { useRouter } from "next/router";
import { Button } from "@shared/ui";
import { DeleteArticleModal } from "@features/articles";
import { GetAdminArticleResponse } from "@entities/article";
import { useMedia } from "@shared/utils";

export interface DeleteArticleButtonProps {
    data?: GetAdminArticleResponse;
}

const DeleteArticleButton = ({ data }: DeleteArticleButtonProps) => {
    const router = useRouter();
    const isMobile = useMedia("sm");

    const closeDeleteModal = () => closeModal("DELETE_ARTICLE");

    const handleCancelDelete = () => closeDeleteModal();

    const handleSuccessDeleteModal = () => {
        closeDeleteModal();
        router.push("/admin/articles");
    };

    const handleOpenDeleteModal = () => {
        openModal({
            modalId: "DELETE_ARTICLE",
            title: "Удаление статьи",
            children: (
                <DeleteArticleModal
                    id={String(data?.id)}
                    name={data?.name}
                    onSuccess={handleSuccessDeleteModal}
                    onCancel={handleCancelDelete}
                />
            ),
        });
    };

    if (isMobile) {
        return (
            <ActionIcon color="dark" onClick={handleOpenDeleteModal}>
                <Trash />
            </ActionIcon>
        );
    }

    return (
        <Button onClick={handleOpenDeleteModal} variant="text" leftIcon={<Trash />}>
            Удалить
        </Button>
    );
};

export default DeleteArticleButton;
