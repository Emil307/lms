import { Flex, Text, useMantineTheme } from "@mantine/core";
import React from "react";
import { AlertTriangle } from "react-feather";
import { Button } from "@shared/ui";
import { useDeleteArticle } from "@entities/article";
import useStyles from "./DeleteArticleModal.styles";

interface DeleteArticleModalProps {
    id: string;
    name?: string;
    onClose: () => void;
}

const DeleteArticleModal = ({ id, name = "", onClose }: DeleteArticleModalProps) => {
    const theme = useMantineTheme();
    const { classes } = useStyles();
    const deleteArticle = useDeleteArticle(id);

    const handleSubmit = () => {
        deleteArticle.mutate(null, {
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
                <Text className={classes.text}>{`Вы действительно хотите удалить статью, «${id}: ${name}»?`}</Text>
            </Flex>
            <Flex gap={8}>
                <Button size="large" variant="border" onClick={onClose} loading={deleteArticle.isLoading} w="100%">
                    Отмена
                </Button>
                <Button size="large" variant="secondary" onClick={handleSubmit} loading={deleteArticle.isLoading} w="100%">
                    Удалить
                </Button>
            </Flex>
        </Flex>
    );
};

export default DeleteArticleModal;
