import { Flex, Stack, Text, useMantineTheme } from "@mantine/core";
import React from "react";
import { AlertTriangle } from "react-feather";
import { Button } from "@shared/ui";
import { useDeleteArticlePackage } from "@entities/articlePackage";
import useStyles from "./DeleteArticlePackageModal.styles";

export interface DeleteArticlePackageModalProps {
    id: string;
    name?: string;
    onClose: () => void;
}

const DeleteArticlePackageModal = ({ id, name, onClose }: DeleteArticlePackageModalProps) => {
    const theme = useMantineTheme();
    const { classes } = useStyles();
    const deleteArticlePackage = useDeleteArticlePackage(id);

    const handleSubmit = () => {
        deleteArticlePackage.mutate(null, {
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
                <Text className={classes.text}>{`Вы действительно хотите удалить пакет базы знаний, «${id}: ${name}»?`}</Text>
            </Flex>
            <Flex gap={8}>
                <Button size="large" variant="border" onClick={onClose} loading={deleteArticlePackage.isLoading} w="100%">
                    Отмена
                </Button>
                <Button size="large" variant="secondary" onClick={handleSubmit} loading={deleteArticlePackage.isLoading} w="100%">
                    Удалить
                </Button>
            </Flex>
        </Stack>
    );
};

export default DeleteArticlePackageModal;
