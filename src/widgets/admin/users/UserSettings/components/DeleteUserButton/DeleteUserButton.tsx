import { ActionIcon } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { openModal } from "@mantine/modals";
import { Trash } from "react-feather";
import { UserDetailResponse } from "@entities/user";
import { UserDeleteModal } from "@features/users";
import { Button } from "@shared/ui";
import { getFullName } from "@shared/utils";

export interface DeleteUserButtonProps {
    data?: UserDetailResponse;
    hidden?: boolean;
}

const DeleteUserButton = ({ data, hidden = false }: DeleteUserButtonProps) => {
    const isMobile = useMediaQuery("(max-width: 744px)");

    const openModalDeleteUser = () => {
        openModal({
            modalId: `${data?.id}`,
            title: "Удаление пользователя",
            centered: true,
            children: <UserDeleteModal redirectUrl="/admin/users" id={String(data?.id)} fio={getFullName({ data: data?.profile })} />,
        });
    };

    if (hidden) {
        return null;
    }

    if (isMobile) {
        return (
            <ActionIcon color="dark" onClick={openModalDeleteUser}>
                <Trash />
            </ActionIcon>
        );
    }

    return (
        <Button onClick={openModalDeleteUser} variant="text" leftIcon={<Trash />}>
            Удалить пользователя
        </Button>
    );
};

export default DeleteUserButton;
