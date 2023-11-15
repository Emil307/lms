import { Box, Flex, ThemeIcon } from "@mantine/core";
import React from "react";
import { AlertTriangle } from "react-feather";
import { ControlButtons, Paragraph } from "@shared/ui";
import { useDeleteArticleMaterial } from "@entities/article";
import useStyles from "./DeleteArticleMaterialModal.styles";

export interface DeleteArticleMaterialModalProps {
    id: number;
    articleId: string;
    name?: string;
    onClose: () => void;
}

const DeleteArticleMaterialModal = ({ id, articleId, name = "", onClose }: DeleteArticleMaterialModalProps) => {
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
        <Flex direction="column" gap={56}>
            <Flex gap={16}>
                <ThemeIcon className={classes.warning}>
                    <AlertTriangle />
                </ThemeIcon>
                <Box>
                    <Paragraph variant="small-m" component="span">
                        {`Вы действительно хотите удалить материал, `}
                    </Paragraph>
                    <Paragraph variant="small-semi" component="span">{`«${id}: ${name}»?`}</Paragraph>
                </Box>
            </Flex>
            <ControlButtons
                variant="modal"
                cancelButtonText="Отмена"
                submitButtonText="Удалить"
                onSubmit={handleSubmit}
                onClose={onClose}
                isLoading={deleteArticleMaterial.isLoading}
            />
        </Flex>
    );
};

export default DeleteArticleMaterialModal;
