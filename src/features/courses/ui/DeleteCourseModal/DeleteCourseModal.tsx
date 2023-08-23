import { Box, Flex, ThemeIcon } from "@mantine/core";
import React from "react";
import { AlertTriangle } from "react-feather";
import { Button, Paragraph } from "@shared/ui";
import { useDeleteCourse } from "@entities/course";
import { useMedia } from "@shared/utils";
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

    const isTablet = useMedia("md");

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
            <Flex gap={8}>
                <Button size={isTablet ? "medium" : "large"} variant="border" onClick={onCancel} disabled={isLoading} w="50%">
                    Отмена
                </Button>
                <Button size={isTablet ? "medium" : "large"} variant="secondary" onClick={handleSubmit} loading={isLoading} w="50%">
                    Удалить
                </Button>
            </Flex>
        </Flex>
    );
};

export default DeleteCourseModal;
