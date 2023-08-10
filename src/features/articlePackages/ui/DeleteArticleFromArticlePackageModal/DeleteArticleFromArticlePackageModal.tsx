import { Box, Flex, ThemeIcon } from "@mantine/core";
import React from "react";
import { AlertTriangle } from "react-feather";
import { Button, Paragraph } from "@shared/ui";
import { useDeleteArticleFromArticlePackage } from "@entities/articlePackage";
import useStyles from "./DeleteArticleFromArticlePackageModal.styles";

export interface DeleteArticleFromArticlePackageModalProps {
    id: number;
    name?: string;
    articlePackageId: string;
    onClose: () => void;
}

const DeleteArticleFromArticlePackageModal = ({ id, name, articlePackageId, onClose }: DeleteArticleFromArticlePackageModalProps) => {
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
        <Flex direction="column" gap={24}>
            <Flex gap={16} mih={80}>
                <ThemeIcon className={classes.warning}>
                    <AlertTriangle />
                </ThemeIcon>
                <Box>
                    <Paragraph variant="small-m" component="span">
                        {`Вы действительно хотите удалить статью из пакета, `}
                    </Paragraph>
                    <Paragraph variant="small-semi" component="span">{`«${id}: ${name}»?`}</Paragraph>
                </Box>
            </Flex>
            <Flex gap={8}>
                <Button size="large" variant="border" onClick={onClose} loading={deleteArticlePackage.isLoading} w="100%">
                    Отмена
                </Button>
                <Button size="large" variant="secondary" onClick={handleSubmit} loading={deleteArticlePackage.isLoading} w="100%">
                    Удалить
                </Button>
            </Flex>
        </Flex>
    );
};

export default DeleteArticleFromArticlePackageModal;
