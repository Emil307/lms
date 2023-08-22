import { Box, Flex, ThemeIcon, Text } from "@mantine/core";
import React from "react";
import { AlertTriangle } from "react-feather";
import { Button } from "@shared/ui";
import { useDeleteLesson } from "@entities/lesson";
import { useMedia } from "@shared/utils";
import useStyles from "./DeleteLessonModal.styles";

export interface DeleteLessonModalProps {
    id: string;
    name: string;
    onCancel: () => void;
    onSuccess: () => void;
}

const DeleteLessonModal = ({ id, name, onSuccess, onCancel }: DeleteLessonModalProps) => {
    const { classes } = useStyles();
    const { mutate: deleteLesson, isLoading } = useDeleteLesson(id);

    const isTablet = useMedia("md");

    const handleSubmit = () => {
        deleteLesson(null, {
            onSuccess: () => {
                onSuccess();
            },
        });
    };

    return (
        <Flex direction="column" gap={56}>
            <Flex gap={16} align="center">
                <Flex align="center" justify="center" className={classes.warning}>
                    <ThemeIcon variant="outline" color="secondary">
                        <AlertTriangle />
                    </ThemeIcon>
                </Flex>
                <Box className={classes.textWrapper}>
                    <Text>
                        Вы действительно хотите удалить урок,
                        <Text className={classes.textData}>{` «ID: ${id} ${name}»?`}</Text>
                    </Text>
                </Box>
            </Flex>
            <Flex gap={8}>
                <Button variant="border" size={isTablet ? "medium" : "large"} onClick={onCancel} disabled={isLoading} w="50%">
                    Отмена
                </Button>
                <Button variant="secondary" size={isTablet ? "medium" : "large"} onClick={handleSubmit} loading={isLoading} w="50%">
                    Удалить
                </Button>
            </Flex>
        </Flex>
    );
};

export default DeleteLessonModal;
