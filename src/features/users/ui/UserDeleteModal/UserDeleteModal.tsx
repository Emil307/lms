import { Box, Flex, useMantineTheme } from "@mantine/core";
import { closeModal } from "@mantine/modals";
import React from "react";
import { AlertTriangle } from "react-feather";
import { useRouter } from "next/router";
import { LinkProps } from "next/link";
import { Button } from "@shared/ui";
import { queryClient } from "@app/providers";
import { QueryKeys } from "@shared/constant";
import { useDeleteUser } from "@entities/user";
import { UserDeleteModalStyles } from "./UserDeleteModal.styles";

interface UserDeleteModalProps {
    id: string;
    fio: string;
    redirectUrl?: LinkProps["href"];
}

const UserDeleteModal = ({ id, fio, redirectUrl }: UserDeleteModalProps) => {
    const router = useRouter();
    const theme = useMantineTheme();
    const { classes } = UserDeleteModalStyles();
    const deleteUser = useDeleteUser();
    const handlerDeleteUser = async () => {
        try {
            await deleteUser.mutateAsync(id);
            queryClient.invalidateQueries([QueryKeys.GET_USERS]);
            closeModal(`${id}`);
            if (!redirectUrl) return;
            router.push(redirectUrl);
        } catch {
            // TODO - вызвать сообщение об ошибке
            closeModal(`${id}`);
        }
    };
    return (
        <Flex direction="column" gap={24}>
            <Flex gap={16} mih={80}>
                <Flex align="center" justify="center" className={classes.warning}>
                    <AlertTriangle color={theme.colors.secondary[0]} />
                </Flex>
                <Box className={classes.text}>{`Вы действительно хотите удалить пользователя, «ID: ${id} ${fio}»?`}</Box>
            </Flex>
            <Flex gap={8}>
                <Button size="large" variant="border" onClick={() => closeModal(`${id}`)} loading={deleteUser.isLoading} w="100%">
                    Отмена
                </Button>
                <Button size="large" variant="secondary" onClick={handlerDeleteUser} loading={deleteUser.isLoading} w="100%">
                    Удалить
                </Button>
            </Flex>
        </Flex>
    );
};

export default UserDeleteModal;
