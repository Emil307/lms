import { Box, Flex, ThemeIcon, Text } from "@mantine/core";
import React from "react";
import { AlertTriangle } from "react-feather";
import { Button } from "@shared/ui";
import { useDeleteCourse } from "@entities/course";
import useStyles from "./DeleteCourseModal.styles";
import { useMediaQuery } from "@mantine/hooks";

export interface DeleteCourseModalProps {
    id: string;
    name: string;
    onCancel: () => void;
    onSuccess: () => void;
}

const DeleteCourseModal = ({ id, name, onSuccess, onCancel }: DeleteCourseModalProps) => {
    const { classes } = useStyles();
    const { mutate: deleteCourse, isLoading } = useDeleteCourse(id);

    const isTablet = useMediaQuery("(max-width: 1024px)");

    const handleSubmit = () => {
        deleteCourse(null, {
            onSuccess: () => {
                onSuccess();
            },
        });
    };

    return (
        <Flex direction="column" gap={56}>
            <Flex gap={16} align="center">
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
