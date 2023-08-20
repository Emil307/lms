import { ActionIcon } from "@mantine/core";
import { closeModal, openModal } from "@mantine/modals";
import { Trash } from "react-feather";
import { useRouter } from "next/router";
import { UserDetailResponse } from "@entities/user";
import { UserDeleteModal } from "@features/users";
import { Button } from "@shared/ui";
import { getFullName, useMedia } from "@shared/utils";

export interface DeleteStudentButtonProps {
    data?: UserDetailResponse;
    hidden?: boolean;
}

const DeleteStudentButton = ({ data, hidden = false }: DeleteStudentButtonProps) => {
    const router = useRouter();
    const isMobile = useMedia("sm");

    const handleCloseDeleteModal = () => {
        closeModal("DELETE_USER");
        router.push("/admin/students");
    };

    const handleOpenDeleteModal = () => {
        openModal({
            modalId: "DELETE_USER",
            title: "Удаление пользователя",
            children: <UserDeleteModal id={String(data?.id)} fio={getFullName({ data: data?.profile })} onClose={handleCloseDeleteModal} />,
        });
    };

    if (hidden) {
        return null;
    }

    if (isMobile) {
        return (
            <ActionIcon color="dark" onClick={handleOpenDeleteModal}>
                <Trash />
            </ActionIcon>
        );
    }

    return (
        <Button onClick={handleOpenDeleteModal} variant="text" leftIcon={<Trash />}>
            Удалить пользователя
        </Button>
    );
};

export default DeleteStudentButton;
