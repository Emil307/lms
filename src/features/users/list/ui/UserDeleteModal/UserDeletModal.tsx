import { Box, Flex, Stack } from "@mantine/core";
import { closeModal } from "@mantine/modals";
import React from "react";
import { AlertTriangle } from "react-feather";
import { Button } from "@shared/ui";
import { useDeleteUser } from "@entities/user/query";
import { queryClient } from "@app/providers";
import { QueryKeys } from "@shared/constant";

interface UserDeleteModalProps {
    id: number;
    fio: string;
}

const UserDeleteModal = ({ id, fio }: UserDeleteModalProps) => {
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
                <Box>
                    <AlertTriangle />
                </Box>
                <Box>{`Вы действительно хотите удалить пользователя, «‎ID: ${id} ${fio}»‎?`}</Box>
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
