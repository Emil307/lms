import { Box, Flex, Stack, useMantineTheme } from "@mantine/core";
import { closeModal } from "@mantine/modals";
import React from "react";
import { AlertTriangle } from "react-feather";
import { Button } from "@shared/ui";
import { useDeleteUser } from "@entities/user/query";
import { queryClient } from "@app/providers";
import { QueryKeys } from "@shared/constant";
import { UserDeleteModalStyles } from "./UserDeleteModal.styles";

interface UserDeleteModalProps {
    id: number;
    fio: string;
}

const UserDeleteModal = ({ id, fio }: UserDeleteModalProps) => {
    const theme = useMantineTheme();
    const { classes } = UserDeleteModalStyles();
    const deleteUser = useDeleteUser();
    const handlerDeleteUser = async () => {
        try {
            await deleteUser.mutateAsync(id);
            queryClient.refetchQueries([QueryKeys.GET_USERS]);
            closeModal(`${id}`);
        } catch {
            // TODO - вызвать сообщение об ошибке
            closeModal(`${id}`);
        }
    };
    return (
        <Stack>
            <Flex gap={16}>
                <Flex align="center" justify="center" className={classes.warning}>
                    <AlertTriangle color={theme.colors.secondary[0]} />
                </Flex>
                <Box className={classes.text}>{`Вы действительно хотите удалить пользователя, «ID: ${id} ${fio}»?`}</Box>
            </Flex>
            <Flex gap={8}>
                <Button size="large" variant="border" onClick={() => closeModal(`${id}`)} loading={deleteUser.isLoading}>
                    Отмена
                </Button>
                <Button size="large" variant="secondary" onClick={handlerDeleteUser} loading={deleteUser.isLoading}>
                    Удалить
                </Button>
            </Flex>
        </Stack>
    );
};

export default UserDeleteModal;
