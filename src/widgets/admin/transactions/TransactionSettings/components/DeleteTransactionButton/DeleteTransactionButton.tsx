import { ActionIcon } from "@mantine/core";
import { closeModal, openModal } from "@mantine/modals";
import { Trash } from "react-feather";
import { useRouter } from "next/router";
import { Button } from "@shared/ui";
import { useMedia } from "@shared/utils";
import { DeleteTransactionModal } from "@features/transactions";
import { GetAdminTransactionResponse } from "@entities/transaction";

export interface DeleteTransactionButtonProps {
    data?: GetAdminTransactionResponse;
}

const DeleteTransactionButton = ({ data }: DeleteTransactionButtonProps) => {
    const router = useRouter();
    const isMobile = useMedia("sm");

    const handleCloseDeleteModal = () => {
        closeModal("DELETE_TRANSACTION");
        router.push("/admin/transactions");
    };

    const openDeleteModal = () => {
        openModal({
            modalId: "DELETE_TRANSACTION",
            title: "Удаление транзакции",
            children: <DeleteTransactionModal id={String(data?.id)} name={data?.entity.type.name} onClose={handleCloseDeleteModal} />,
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
            Удалить транзакцию
        </Button>
    );
};

export default DeleteTransactionButton;
