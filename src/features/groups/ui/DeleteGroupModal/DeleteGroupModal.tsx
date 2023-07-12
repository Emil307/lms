import { Flex, Text, useMantineTheme } from "@mantine/core";
import React from "react";
import { AlertTriangle } from "react-feather";
import { Button } from "@shared/ui";
import { useAdminDeleteGroup } from "@entities/group";
import useStyles from "./DeleteGroupModal.styles";

interface DeleteGroupModalProps {
    id: string;
    name?: string;
    onClose: () => void;
}

const DeleteGroupModal = ({ id, name = "", onClose }: DeleteGroupModalProps) => {
    const theme = useMantineTheme();
    const { classes } = useStyles();
    const deleteGroup = useAdminDeleteGroup({ id });

    const handleSubmit = () => {
        deleteGroup.mutate(null, {
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
                <Text className={classes.text}>{`Вы действительно хотите удалить группу, «${id}: ${name}»?`}</Text>
            </Flex>
            <Flex gap={8}>
                <Button size="large" variant="border" onClick={onClose} loading={deleteGroup.isLoading} w="100%">
                    Отмена
                </Button>
                <Button size="large" variant="secondary" onClick={handleSubmit} loading={deleteGroup.isLoading} w="100%">
                    Удалить
                </Button>
            </Flex>
        </Flex>
    );
};

export default DeleteGroupModal;
