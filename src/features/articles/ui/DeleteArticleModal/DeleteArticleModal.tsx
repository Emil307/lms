import { Box, Flex, ThemeIcon } from "@mantine/core";
import React from "react";
import { AlertTriangle } from "react-feather";
import { ControlButtons, Paragraph } from "@shared/ui";
import { useDeleteArticle } from "@entities/article";
import useStyles from "./DeleteArticleModal.styles";

export interface DeleteArticleModalProps {
    id: string;
    name?: string;
    onSuccess: () => void;
    onCancel: () => void;
}

const DeleteArticleModal = ({ id, name = "", onSuccess, onCancel }: DeleteArticleModalProps) => {
    const { classes } = useStyles();
    const deleteArticle = useDeleteArticle(id);

    const handleSubmit = () => {
        deleteArticle.mutate(null, {
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
                        {`Вы действительно хотите удалить статью, `}
                    </Paragraph>
                    <Paragraph variant="small-semi" component="span">{`«${id}: ${name}»?`}</Paragraph>
                </Box>
            </Flex>
            <ControlButtons
                variant="modal"
                cancelButtonText="Отмена"
                submitButtonText="Удалить"
                onSubmit={handleSubmit}
                onClose={onCancel}
                isLoading={deleteArticle.isLoading}
            />
        </Flex>
    );
};

export default DeleteArticleModal;
