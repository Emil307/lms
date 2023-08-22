import { Box, Flex, ThemeIcon } from "@mantine/core";
import React from "react";
import { AlertTriangle } from "react-feather";
import { Button, Paragraph } from "@shared/ui";
import { useDeleteCategory } from "@entities/category";
import { useMedia } from "@shared/utils";
import useStyles from "./DeleteCategoryModal.styles";

export interface DeleteCategoryModalProps {
    id: string;
    name: string;
    isSubcategory?: boolean;
    onClose: () => void;
}

const DeleteCategoryModal = ({ id, name, isSubcategory, onClose }: DeleteCategoryModalProps) => {
    const { classes } = useStyles();
    const deleteCategory = useDeleteCategory({ id });

    const isMobile = useMedia("xs");

    const handleSubmit = () => {
        deleteCategory.mutate(null, {
            onSuccess: () => {
                onClose();
            },
        });
    };

    const contentText = isSubcategory ? `Вы действительно хотите удалить подкатегорию, ` : `Вы действительно хотите удалить категорию, `;

    return (
        <Flex direction="column" gap={24}>
            <Flex gap={16} mih={80}>
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
            <Flex gap={8}>
                <Button size={isMobile ? "medium" : "large"} variant="border" onClick={onClose} loading={deleteCategory.isLoading} w="100%">
                    Отмена
                </Button>
                <Button
                    size={isMobile ? "medium" : "large"}
                    variant="secondary"
                    onClick={handleSubmit}
                    loading={deleteCategory.isLoading}
                    w="100%">
                    Удалить
                </Button>
            </Flex>
        </Flex>
    );
};

export default DeleteCategoryModal;
