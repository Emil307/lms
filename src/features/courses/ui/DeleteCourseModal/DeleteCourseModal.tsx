import { Box, Flex, ThemeIcon, Text } from "@mantine/core";
import React from "react";
import { AlertTriangle } from "react-feather";
import { Button } from "@shared/ui";
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
    const { mutate: deleteCourse, isLoading } = useDeleteCourse(id);

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
                <Flex align="center" justify="center" className={classes.warning}>
                    <ThemeIcon variant="outline" color="secondary" sx={{ border: "none" }}>
                        <AlertTriangle />
                    </ThemeIcon>
                </Flex>
                <Box className={classes.textWrapper}>
                    <Text>
                        Вы действительно хотите удалить учебный курс,
                        <Text className={classes.textData}>{` «ID: ${id} ${name}»?`}</Text>
                    </Text>
                </Box>
            </Flex>
            <Flex gap={8}>
                <Button size="large" variant="border" onClick={onCancel} loading={isLoading} w="100%">
                    Отмена
                </Button>
                <Button size="large" variant="secondary" onClick={handleSubmit} loading={isLoading} w="100%">
                    Удалить
                </Button>
            </Flex>
        </Flex>
    );
};

export default DeleteCourseModal;
