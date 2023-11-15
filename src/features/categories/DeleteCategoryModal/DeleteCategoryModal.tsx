import { Box, Flex, ThemeIcon } from "@mantine/core";
import React from "react";
import { AlertTriangle } from "react-feather";
import { ControlButtons, Paragraph } from "@shared/ui";
import { useDeleteCategory } from "@entities/category";
import useStyles from "./DeleteCategoryModal.styles";

export interface DeleteCategoryModalProps {
    id: string;
    name: string;
    isSubcategory?: boolean;
    onClose: () => void;
}

const DeleteCategoryModal = ({ id, name, isSubcategory, onClose }: DeleteCategoryModalProps) => {
    const { classes } = useStyles();
    const deleteCategory = useDeleteCategory({ id, name });

    const handleSubmit = () => {
        deleteCategory.mutate(null, {
            onSuccess: () => {
                onClose();
            },
        });
    };

    const contentText = isSubcategory ? `Вы действительно хотите удалить подкатегорию, ` : `Вы действительно хотите удалить категорию, `;

    return (
        <Flex direction="column" gap={56}>
            <Flex gap={16}>
                <ThemeIcon className={classes.warning}>
                    <AlertTriangle />
                </ThemeIcon>
                <Box>
                    <Paragraph variant="small-m" component="span">
                        {contentText}
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
                isLoading={deleteCategory.isLoading}
            />
        </Flex>
    );
};

export default DeleteCategoryModal;
