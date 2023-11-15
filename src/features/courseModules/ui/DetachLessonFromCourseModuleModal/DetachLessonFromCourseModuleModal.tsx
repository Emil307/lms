import { Box, Flex, ThemeIcon } from "@mantine/core";
import React from "react";
import { AlertTriangle } from "react-feather";
import { ControlButtons, Paragraph } from "@shared/ui";
import { useDetachLessonFromCourseModule } from "@entities/courseModule";
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

    const handleSubmit = () => {
        detachLessonFromModule(null, {
            onSuccess: () => {
                onClose();
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
                        {" Вы действительно хотите удалить урок, "}
                    </Paragraph>
                    <Paragraph variant="small-semi" component="span">{`«ID: ${lessonId} ${lessonName}» `}</Paragraph>
                    <Paragraph variant="small-m" component="span">
                        {"из модуля "}
                    </Paragraph>
                    <Paragraph variant="small-semi" component="span">{`«${moduleName}»? `}</Paragraph>
                </Box>
            </Flex>
            <ControlButtons
                variant="modal"
                cancelButtonText="Отмена"
                submitButtonText="Удалить"
                onSubmit={handleSubmit}
                onClose={onClose}
                isLoading={isLoading}
            />
        </Flex>
    );
};

export default DetachLessonFromCourseModuleModal;
