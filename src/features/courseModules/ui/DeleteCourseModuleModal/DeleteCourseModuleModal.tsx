import { Box, Flex, ThemeIcon } from "@mantine/core";
import React from "react";
import { AlertTriangle } from "react-feather";
import { ControlButtons, Paragraph } from "@shared/ui";
import { useDeleteCourseModule } from "@entities/courseModule";
import useStyles from "./DeleteCourseModuleModal.styles";

export interface DeleteCourseModuleModalProps {
    courseId: string;
    moduleId: string;
    moduleName: string;
    onClose: () => void;
}

const DeleteCourseModuleModal = ({ courseId, moduleId, moduleName, onClose }: DeleteCourseModuleModalProps) => {
    const { classes } = useStyles();
    const { mutate: deleteCourseModule, isLoading } = useDeleteCourseModule({ courseId, moduleId, moduleName });

    const handleSubmit = () => {
        deleteCourseModule(null, {
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
                        {"Вы действительно хотите удалить модуль, "}
                    </Paragraph>
                    <Paragraph variant="small-semi" component="span">{`«ID: ${moduleId} ${moduleName}»?`}</Paragraph>
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

export default DeleteCourseModuleModal;
