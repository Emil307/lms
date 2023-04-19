import { Box, Flex, Stack, useMantineTheme } from "@mantine/core";
import React from "react";
import { AlertTriangle } from "react-feather";
import { Button } from "@shared/ui";
import { useDeleteGroup } from "@entities/group";
import useStyles from "./DeleteGroupModal.styles";

interface DeleteGroupModalProps {
    id: string;
    name?: string;
    onClose: () => void;
}

const DeleteGroupModal = ({ id, name = "", onClose }: DeleteGroupModalProps) => {
    const theme = useMantineTheme();
    const { classes } = useStyles();
    const deleteGroup = useDeleteGroup(id);

    const handleSubmit = () => {
        deleteGroup.mutate(null, {
            onSuccess: () => {
                onClose();
            },
        });
    };

    return (
        <Stack>
            <Flex gap={16}>
                <Flex align="center" justify="center" className={classes.warning}>
                    <AlertTriangle color={theme.colors.secondary[0]} />
                </Flex>
                <Box className={classes.text}>{`Вы действительно хотите удалить группу, «ID: ${id} ${name}»?`}</Box>
            </Flex>
            <Flex gap={8}>
                <Button size="large" variant="border" onClick={onClose} loading={deleteGroup.isLoading}>
                    Отмена
                </Button>
                <Button size="large" variant="secondary" onClick={handleSubmit} loading={deleteGroup.isLoading}>
                    Удалить
                </Button>
            </Flex>
        </Stack>
    );
};

export default DeleteGroupModal;
