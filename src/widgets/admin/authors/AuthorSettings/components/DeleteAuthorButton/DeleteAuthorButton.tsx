import { ActionIcon } from "@mantine/core";
import { closeModal, openModal } from "@mantine/modals";
import { Trash } from "react-feather";
import { useRouter } from "next/router";
import { Button } from "@shared/ui";
import { DeleteAuthorModal } from "@features/authors";
import { GetAdminAuthorResponse } from "@entities/author";
import { getFullName, useMedia } from "@shared/utils";

export interface DeleteAuthorButtonProps {
    data?: GetAdminAuthorResponse;
}

const DeleteAuthorButton = ({ data }: DeleteAuthorButtonProps) => {
    const router = useRouter();
    const isMobile = useMedia("sm");

    const userFullName = getFullName({ data });

    const handleCloseDeleteAuthorModal = () => {
        closeModal("DELETE_AUTHOR");
        router.push({ pathname: "/admin/settings/authors" });
    };

    const openModalDeleteAuthor = () => {
        openModal({
            modalId: "DELETE_AUTHOR",
            title: "Удаление автора",
            children: <DeleteAuthorModal id={String(data?.id)} fullName={userFullName} onClose={handleCloseDeleteAuthorModal} />,
        });
    };

    if (isMobile) {
        return (
            <ActionIcon color="dark" onClick={openModalDeleteAuthor}>
                <Trash />
            </ActionIcon>
        );
    }

    return (
        <Button onClick={openModalDeleteAuthor} variant="text" leftIcon={<Trash />}>
            Удалить автора
        </Button>
    );
};

export default DeleteAuthorButton;
