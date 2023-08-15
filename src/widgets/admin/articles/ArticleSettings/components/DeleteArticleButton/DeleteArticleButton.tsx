import { ActionIcon } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { closeModal, openModal } from "@mantine/modals";
import { Trash } from "react-feather";
import { useRouter } from "next/router";
import { Button } from "@shared/ui";
import { DeleteArticleModal } from "@features/articles";
import { GetAdminArticleResponse } from "@entities/article";

export interface DeleteArticleButtonProps {
    data?: GetAdminArticleResponse;
}

const DeleteArticleButton = ({ data }: DeleteArticleButtonProps) => {
    const router = useRouter();
    const isMobile = useMediaQuery("(max-width: 744px)");

    const handleCloseDeleteModal = () => {
        closeModal("DELETE_ARTICLE");
        router.push("/admin/articles");
    };

    const handleOpenDeleteModal = () => {
        openModal({
            modalId: "DELETE_ARTICLE",
            title: "Удаление статьи",
            children: <DeleteArticleModal id={String(data?.id)} name={data?.name} onClose={handleCloseDeleteModal} />,
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
