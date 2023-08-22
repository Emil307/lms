import { Box, Flex, ThemeIcon, Text } from "@mantine/core";
import React from "react";
import { AlertTriangle } from "react-feather";
import { Button } from "@shared/ui";
import { useDetachLessonFromCourseModule } from "@entities/courseModule";
import { useMedia } from "@shared/utils";
import useStyles from "./DetachLessonFromCourseModuleModal.styles";

export interface DetachLessonFromCourseModuleModalProps {
    courseId: string;
    moduleId: string;
    lessonId: string;
    moduleName: string;
    lessonName: string;
    onClose: () => void;
}

const DetachLessonFromCourseModuleModal = ({
    courseId,
    moduleId,
    lessonId,
    lessonName,
    moduleName,
    onClose,
}: DetachLessonFromCourseModuleModalProps) => {
    const { classes } = useStyles();
    const { mutate: detachLessonFromModule, isLoading } = useDetachLessonFromCourseModule({
        courseId,
        moduleId,
        lessonId,
        lessonName,
        moduleName,
    });

    const isTablet = useMedia("md");

    const handleSubmit = () => {
        detachLessonFromModule(null, {
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
                        Вы действительно хотите удалить урок,
                        <Text className={classes.textData}>{` «ID: ${lessonId} ${lessonName}» `}</Text>
                        из модуля <Text className={classes.textData}>{` «${moduleName}»? `}</Text>
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

export default DetachLessonFromCourseModuleModal;
