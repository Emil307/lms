import { Box, Flex, useMantineTheme } from "@mantine/core";
import React from "react";
import { AlertTriangle } from "react-feather";
import { Button } from "@shared/ui";
import { useDeleteArticleMaterial } from "@entities/article";
import useStyles from "./DeleteArticleMaterialModal.styles";

export interface DeleteArticleMaterialModalProps {
    id: number;
    articleId: string;
    name?: string;
    onClose: () => void;
}

const DeleteArticleMaterialModal = ({ id, articleId, name = "", onClose }: DeleteArticleMaterialModalProps) => {
    const theme = useMantineTheme();
    const { classes } = useStyles();
    const deleteArticleMaterial = useDeleteArticleMaterial({ articleId, materialId: id });

    const handleSubmit = () => {
        deleteArticleMaterial.mutate(null, {
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
                <Box className={classes.text}>{`Вы действительно хотите удалить материал, «${id}: ${name}»?`}</Box>
            </Flex>
            <Flex gap={8}>
                <Button size="large" variant="border" onClick={onClose} loading={deleteArticleMaterial.isLoading} w="100%">
                    Отмена
                </Button>
                <Button size="large" variant="secondary" onClick={handleSubmit} loading={deleteArticleMaterial.isLoading} w="100%">
                    Удалить
                </Button>
            </Flex>
        </Flex>
    );
};

export default DeleteArticleMaterialModal;
