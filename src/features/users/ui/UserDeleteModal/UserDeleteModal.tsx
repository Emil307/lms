import { Box, Flex, ThemeIcon } from "@mantine/core";
import React from "react";
import { AlertTriangle } from "react-feather";
import { Button, Paragraph } from "@shared/ui";
import { useDeleteUser } from "@entities/user";
import { useMedia } from "@shared/utils";
import { UserDeleteModalStyles } from "./UserDeleteModal.styles";

export interface UserDeleteModalProps {
    id: string;
    fio: string;
    onSuccess: () => void;
    onCancel: () => void;
}

const UserDeleteModal = ({ id, fio, onSuccess, onCancel }: UserDeleteModalProps) => {
    const { classes } = UserDeleteModalStyles();
    const deleteUser = useDeleteUser({ id, fio });

    const isMobile = useMedia("xs");

    const handleDeleteUser = async () => {
        deleteUser.mutate(null, {
            onSuccess: () => {
                onSuccess();
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
                        {`Вы действительно хотите удалить пользователя, `}
                    </Paragraph>
                    <Paragraph variant="small-semi" component="span">{`«${id}: ${fio}»?`}</Paragraph>
                </Box>
            </Flex>
            <Flex gap={8}>
                <Button size={isMobile ? "medium" : "large"} variant="border" onClick={onCancel} loading={deleteUser.isLoading} w="100%">
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
