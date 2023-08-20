import { ActionIcon } from "@mantine/core";
import { closeModal, openModal } from "@mantine/modals";
import { Trash } from "react-feather";
import { Button } from "@shared/ui";
import { DeleteArticlePackageModal } from "@features/articlePackages";
import { GetAdminArticlePackageResponse } from "@entities/articlePackage";
import { useMedia } from "@shared/utils";

export interface DeleteArticlePackageButtonProps {
    data?: GetAdminArticlePackageResponse;
}

const DeleteArticlePackageButton = ({ data }: DeleteArticlePackageButtonProps) => {
    const isMobile = useMedia("sm");

    const handleCloseDeleteModal = () => {
        closeModal("DELETE_ARTICLE_PACKAGE");
    };

    const openDeleteModal = () => {
        openModal({
            modalId: "DELETE_ARTICLE_PACKAGE",
            title: "Удаление пакета",
            children: <DeleteArticlePackageModal id={String(data?.id)} name={data?.name} onClose={handleCloseDeleteModal} />,
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
            Удалить пакет
        </Button>
    );
};

export default DeleteArticlePackageButton;
