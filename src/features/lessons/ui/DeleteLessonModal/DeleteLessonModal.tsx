import { Box, Flex, ThemeIcon } from "@mantine/core";
import React from "react";
import { AlertTriangle } from "react-feather";
import { ControlButtons, Paragraph } from "@shared/ui";
import { useDeleteLesson } from "@entities/lesson";
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
            <ControlButtons
                variant="modal"
                cancelButtonText="Отмена"
                submitButtonText="Удалить"
                onSubmit={handleSubmit}
                onClose={onCancel}
                isLoading={isLoading}
            />
        </Flex>
    );
};

export default DeleteLessonModal;
