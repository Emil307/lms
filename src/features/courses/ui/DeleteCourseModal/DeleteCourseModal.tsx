import { Box, Flex, ThemeIcon } from "@mantine/core";
import React from "react";
import { AlertTriangle } from "react-feather";
import { ControlButtons, Paragraph } from "@shared/ui";
import { useDeleteCourse } from "@entities/course";
import useStyles from "./DeleteCourseModal.styles";

export interface DeleteCourseModalProps {
    id: string;
    name: string;
    onCancel: () => void;
    onSuccess: () => void;
}

const DeleteCourseModal = ({ id, name, onSuccess, onCancel }: DeleteCourseModalProps) => {
    const { classes } = useStyles();
    const { mutate: deleteCourse, isLoading } = useDeleteCourse({ id, name });

    const handleSubmit = () => {
        deleteCourse(null, {
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
                        Вы действительно хотите удалить учебный курс
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

export default DeleteCourseModal;
