import { Flex, Box, ThemeIcon } from "@mantine/core";
import React from "react";
import { AlertTriangle } from "react-feather";
import { Button, Paragraph } from "@shared/ui";
import { useDeleteTransaction } from "@entities/transaction";
import useStyles from "./DeleteTransactionModal.styles";

export interface DeleteTransactionModalProps {
    id: string;
    name?: string;
    onClose: () => void;
}

const DeleteTransactionModal = ({ id, name, onClose }: DeleteTransactionModalProps) => {
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
        <Flex direction="column" gap={56}>
            <Flex gap={16}>
                <ThemeIcon className={classes.warning}>
                    <AlertTriangle />
                </ThemeIcon>
                <Box>
                    <Paragraph variant="small-m" component="span">
                        Вы действительно хотите удалить транзакцию,
                    </Paragraph>
                    <Paragraph variant="small-semi" component="span">
                        {` «${id}:${name}»?`}
                    </Paragraph>
                </Box>
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
