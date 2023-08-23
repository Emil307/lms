import { Box, Flex, ThemeIcon } from "@mantine/core";
import React from "react";
import { AlertTriangle } from "react-feather";
import { Button, Paragraph } from "@shared/ui";
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
            <Flex gap={16}>
                <ThemeIcon color="secondary" className={classes.warning}>
                    <AlertTriangle />
                </ThemeIcon>
                <Box>
                    <Paragraph variant="small-m" component="span">
                        Вы действительно хотите удалить урок,
                    </Paragraph>
                    <Paragraph variant="small-semi" component="span">{` «ID: ${id} ${name}»?`}</Paragraph>
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
