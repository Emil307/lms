import { Flex, Stack, Text, useMantineTheme } from "@mantine/core";
import React from "react";
import { AlertTriangle } from "react-feather";
import { Button } from "@shared/ui";
import { useDeleteArticleFromArticlePackage } from "@entities/articlePackage";
import useStyles from "./DeleteArticleFromArticlePackageModal.styles";

export interface DeleteArticleFromArticlePackageModalProps {
    id: number;
    name?: string;
    articlePackageId: string;
    onClose: () => void;
}

const DeleteArticleFromArticlePackageModal = ({ id, name, articlePackageId, onClose }: DeleteArticleFromArticlePackageModalProps) => {
    const theme = useMantineTheme();
    const { classes } = useStyles();
    const deleteArticlePackage = useDeleteArticleFromArticlePackage({ articlePackageId, articleId: id });

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
                <Text className={classes.text}>{`Вы действительно хотите удалить статью из пакета, «${id}: ${name}»?`}</Text>
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

export default DeleteArticleFromArticlePackageModal;
