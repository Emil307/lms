import { Box, Flex, useMantineTheme } from "@mantine/core";
import React from "react";
import { AlertTriangle } from "react-feather";
import { Button } from "@shared/ui";
import { useDeleteCategory } from "@entities/category";
import useStyles from "./DeleteCategoryModal.styles";

export interface DeleteCategoryModalProps {
    id: string;
    name: string;
    isSubcategory?: boolean;
    onClose: () => void;
}

const DeleteCategoryModal = ({ id, name, isSubcategory, onClose }: DeleteCategoryModalProps) => {
    const theme = useMantineTheme();
    const { classes } = useStyles();
    const deleteCategory = useDeleteCategory({ id });

    const handleSubmit = () => {
        deleteCategory.mutate(null, {
            onSuccess: () => {
                onClose();
            },
        });
    };

    const contentText = isSubcategory
        ? `Вы действительно хотите удалить подкатегорию, «${id}: ${name}»?`
        : `Вы действительно хотите удалить категорию, «${id}: ${name}»?`;

    return (
        <Flex direction="column" gap={24}>
            <Flex gap={16} mih={80}>
                <Flex align="center" justify="center" className={classes.warning}>
                    <AlertTriangle color={theme.colors.secondary[0]} />
                </Flex>
                <Box className={classes.text}>{contentText}</Box>
            </Flex>
            <Flex gap={8}>
                <Button size="large" variant="border" onClick={onClose} loading={deleteCategory.isLoading} w="100%">
                    Отмена
                </Button>
                <Button size="large" variant="secondary" onClick={handleSubmit} loading={deleteCategory.isLoading} w="100%">
                    Удалить
                </Button>
            </Flex>
        </Flex>
    );
};

export default DeleteCategoryModal;
