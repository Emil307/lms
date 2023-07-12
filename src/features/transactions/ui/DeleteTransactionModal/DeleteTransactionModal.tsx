import { Flex, Text, useMantineTheme } from "@mantine/core";
import React from "react";
import { AlertTriangle } from "react-feather";
import { Button } from "@shared/ui";
import { useDeleteTransaction } from "@entities/transaction";
import useStyles from "./DeleteTransactionModal.styles";

export interface DeleteTransactionModalProps {
    id: string;
    name?: string;
    onClose: () => void;
}

const DeleteTransactionModal = ({ id, name, onClose }: DeleteTransactionModalProps) => {
    const theme = useMantineTheme();
    const { classes } = useStyles();
    const deleteTransaction = useDeleteTransaction({ id });

    const handleSubmit = () => {
        deleteTransaction.mutate(null, {
            onSuccess: () => {
                onClose();
            },
        });
    };

    return (
        <Flex direction="column" gap={24}>
            <Flex gap={16} mih={80}>
                <Flex align="center" justify="center" className={classes.warning}>
                    <AlertTriangle color={theme.colors.secondary[0]} />
                </Flex>
                <Text className={classes.text}>{`Вы действительно хотите удалить транзакцию, «${id}:${name}»?`}</Text>
            </Flex>
            <Flex gap={8}>
                <Button size="large" variant="border" onClick={onClose} loading={deleteTransaction.isLoading} w="100%">
                    Отмена
                </Button>
                <Button size="large" variant="secondary" onClick={handleSubmit} loading={deleteTransaction.isLoading} w="100%">
                    Удалить
                </Button>
            </Flex>
        </Flex>
    );
};

export default DeleteTransactionModal;
