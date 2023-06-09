import { Box, Flex, Stack, useMantineTheme } from "@mantine/core";
import React from "react";
import { AlertTriangle } from "react-feather";
import { Button } from "@shared/ui";
import { useDeleteAuthor } from "@entities/author";
import useStyles from "./DeleteAuthorModal.styles";

export interface DeleteAuthorModalProps {
    id: string;
    fullName: string;
    onClose: () => void;
}

const DeleteAuthorModal = ({ id, fullName, onClose }: DeleteAuthorModalProps) => {
    const theme = useMantineTheme();
    const { classes } = useStyles();
    const deleteAuthor = useDeleteAuthor({ id });

    const handleSubmit = () => {
        deleteAuthor.mutate(null, {
            onSuccess: () => {
                onClose();
            },
        });
    };

    return (
        <Stack>
            <Flex gap={16} mih={80}>
                <Flex align="center" justify="center" className={classes.warning}>
                    <AlertTriangle color={theme.colors.secondary[0]} />
                </Flex>
                <Box className={classes.text}>{`Вы действительно хотите удалить автора, «${id}: ${fullName}»?`}</Box>
            </Flex>
            <Flex gap={8}>
                <Button size="large" variant="border" onClick={onClose} loading={deleteAuthor.isLoading} w="100%">
                    Отмена
                </Button>
                <Button size="large" variant="secondary" onClick={handleSubmit} loading={deleteAuthor.isLoading} w="100%">
                    Удалить
                </Button>
            </Flex>
        </Stack>
    );
};

export default DeleteAuthorModal;
