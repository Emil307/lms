import { Box, Flex, ThemeIcon } from "@mantine/core";
import React from "react";
import { AlertTriangle } from "react-feather";
import { Button, Paragraph } from "@shared/ui";
import { useAdminDeleteGroup } from "@entities/group";
import useStyles from "./DeleteGroupModal.styles";

export interface DeleteGroupModalProps {
    id: string;
    name?: string;
    onClose: () => void;
}

const DeleteGroupModal = ({ id, name = "", onClose }: DeleteGroupModalProps) => {
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
                <ThemeIcon className={classes.warning}>
                    <AlertTriangle />
                </ThemeIcon>
                <Box>
                    <Paragraph variant="small-m" component="span">
                        {"Вы действительно хотите удалить группу, "}
                    </Paragraph>
                    <Paragraph variant="small-semi" component="span">{`«${id}: ${name}»?`}</Paragraph>
                </Box>
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
