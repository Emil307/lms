import { Box, Flex, ThemeIcon, Text } from "@mantine/core";
import React from "react";
import { AlertTriangle } from "react-feather";
import { Button } from "@shared/ui";
import { useDeleteCourseModule } from "@entities/courseModule";
import useStyles from "./DeleteCourseModuleModal.styles";
import { useMediaQuery } from "@mantine/hooks";

export interface DeleteCourseModuleModalProps {
    courseId: string;
    moduleId: string;
    moduleName: string;
    onClose: () => void;
}

const DeleteCourseModuleModal = ({ courseId, moduleId, moduleName, onClose }: DeleteCourseModuleModalProps) => {
    const { classes } = useStyles();
    const { mutate: deleteCourseModule, isLoading } = useDeleteCourseModule({ courseId, moduleId, moduleName });

    const isTablet = useMediaQuery("(max-width: 1024px)");

    const handleSubmit = () => {
        deleteCourseModule(null, {
            onSuccess: () => {
                onClose();
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
                        Вы действительно хотите удалить модуль,
                        <Text className={classes.textData}>{` «ID: ${moduleId} ${moduleName}»?`}</Text>
                    </Text>
                </Box>
            </Flex>
            <Flex gap={8}>
                <Button size={isTablet ? "medium" : "large"} variant="border" onClick={onClose} disabled={isLoading} w="50%">
                    Отмена
                </Button>
                <Button size={isTablet ? "medium" : "large"} variant="secondary" onClick={handleSubmit} loading={isLoading} w="50%">
                    Удалить
                </Button>
            </Flex>
        </Flex>
    );
};

export default DeleteCourseModuleModal;
