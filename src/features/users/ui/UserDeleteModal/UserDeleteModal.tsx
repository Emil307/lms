import { Box, Flex, ThemeIcon } from "@mantine/core";
import React from "react";
import { AlertTriangle } from "react-feather";
import { ControlButtons, Paragraph } from "@shared/ui";
import { useDeleteUser } from "@entities/user";
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
            <ControlButtons
                variant="modal"
                cancelButtonText="Отмена"
                submitButtonText="Удалить"
                onSubmit={handleDeleteUser}
                onClose={onCancel}
                isLoading={deleteUser.isLoading}
            />
        </Flex>
    );
};

export default UserDeleteModal;
