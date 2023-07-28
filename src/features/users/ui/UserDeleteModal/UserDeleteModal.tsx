import { Box, Flex, ThemeIcon } from "@mantine/core";
import { closeModal } from "@mantine/modals";
import React from "react";
import { AlertTriangle } from "react-feather";
import { useRouter } from "next/router";
import { LinkProps } from "next/link";
import { useMediaQuery } from "@mantine/hooks";
import { Button, Paragraph } from "@shared/ui";
import { useDeleteUser } from "@entities/user";
import { ToastType, createNotification } from "@shared/utils";
import { UserDeleteModalStyles } from "./UserDeleteModal.styles";

export interface UserDeleteModalProps {
    id: string;
    fio: string;
    redirectUrl?: LinkProps["href"];
}

const UserDeleteModal = ({ id, fio, redirectUrl }: UserDeleteModalProps) => {
    const router = useRouter();
    const { classes } = UserDeleteModalStyles();
    const deleteUser = useDeleteUser();

    const isMobile = useMediaQuery("(max-width: 576px)");

    const handleDeleteUser = async () => {
        deleteUser.mutate(id, {
            onSuccess: () => {
                closeModal(`${id}`);
                createNotification({
                    type: ToastType.SUCCESS,
                    title: "Удаление пользователя",
                    message: `Пользователь "${fio}" успешно удален`,
                });
                if (!redirectUrl) {
                    return;
                }
                router.push(redirectUrl);
            },
            onError: () => {
                createNotification({
                    type: ToastType.WARN,
                    title: "Ошибка удаления пользователя",
                });

                closeModal(`${id}`);
            },
        });
    };

    const handleCancel = () => closeModal(`${id}`);

    return (
        <Flex direction="column" gap={24}>
            <Flex gap={16} mih={80}>
                <ThemeIcon className={classes.warning}>
                    <AlertTriangle />
                </ThemeIcon>
                <Box>
                    <Paragraph variant="small-m" component="span">
                        {`Вы действительно хотите удалить пользователя, `}
                    </Paragraph>
                    <Paragraph variant="small-semi" component="span">{`«${id}: ${fio}»?`}</Paragraph>
                </Box>
            </Flex>
            <Flex gap={8}>
                <Button
                    size={isMobile ? "medium" : "large"}
                    variant="border"
                    onClick={handleCancel}
                    loading={deleteUser.isLoading}
                    w="100%">
                    Отмена
                </Button>
                <Button
                    size={isMobile ? "medium" : "large"}
                    variant="secondary"
                    onClick={handleDeleteUser}
                    loading={deleteUser.isLoading}
                    w="100%">
                    Удалить
                </Button>
            </Flex>
        </Flex>
    );
};

export default UserDeleteModal;
