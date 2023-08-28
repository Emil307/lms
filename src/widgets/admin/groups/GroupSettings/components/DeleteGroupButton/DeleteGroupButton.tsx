import { ActionIcon } from "@mantine/core";
import { closeModal, openModal } from "@mantine/modals";
import { Trash } from "react-feather";
import { useRouter } from "next/router";
import { Button } from "@shared/ui";
import { GetAdminGroupResponse } from "@entities/group";
import { DeleteGroupModal } from "@features/groups";
import { useMedia } from "@shared/utils";

export interface DeleteGroupButtonProps {
    data?: GetAdminGroupResponse;
    hidden?: boolean;
}

const DeleteGroupButton = ({ data, hidden }: DeleteGroupButtonProps) => {
    const router = useRouter();
    const isMobile = useMedia("sm");

    const closeDeleteModal = () => closeModal("DELETE_GROUP");

    const handleCancelDelete = () => closeDeleteModal();

    const handleSuccessDeleteModal = () => {
        closeDeleteModal();
        router.push("/admin/groups");
    };

    const handleOpenDeleteModal = () => {
        openModal({
            modalId: "DELETE_GROUP",
            title: "Удаление группы",
            children: (
                <DeleteGroupModal
                    id={String(data?.id)}
                    name={data?.name}
                    onSuccess={handleSuccessDeleteModal}
                    onCancel={handleCancelDelete}
                />
            ),
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
            Удалить группу
        </Button>
    );
};

export default DeleteGroupButton;
