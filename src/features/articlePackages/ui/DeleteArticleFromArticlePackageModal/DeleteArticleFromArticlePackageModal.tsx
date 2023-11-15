import { Box, Flex, ThemeIcon } from "@mantine/core";
import React from "react";
import { AlertTriangle } from "react-feather";
import { ControlButtons, Paragraph } from "@shared/ui";
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
        <Flex direction="column" gap={56}>
            <Flex gap={16}>
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
            <ControlButtons
                variant="modal"
                cancelButtonText="Отмена"
                submitButtonText="Удалить"
                onSubmit={handleSubmit}
                onClose={onClose}
                isLoading={deleteArticlePackage.isLoading}
            />
        </Flex>
    );
};

export default DeleteArticleFromArticlePackageModal;
