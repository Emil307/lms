import { Box, Flex, ThemeIcon } from "@mantine/core";
import React from "react";
import { AlertTriangle } from "react-feather";
import { ControlButtons, Paragraph } from "@shared/ui";
import { useDeleteArticlePackage } from "@entities/articlePackage";
import useStyles from "./DeleteArticlePackageModal.styles";

export interface DeleteArticlePackageModalProps {
    id: string;
    name?: string;
    onSuccess: () => void;
    onCancel: () => void;
}

const DeleteArticlePackageModal = ({ id, name, onSuccess, onCancel }: DeleteArticlePackageModalProps) => {
    const { classes } = useStyles();
    const deleteArticlePackage = useDeleteArticlePackage(id);

    const handleSubmit = () => {
        deleteArticlePackage.mutate(null, {
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
                        {`Вы действительно хотите удалить пакет базы знаний, `}
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
                isLoading={deleteArticlePackage.isLoading}
            />
        </Flex>
    );
};

export default DeleteArticlePackageModal;
