import { Box, Flex, ThemeIcon } from "@mantine/core";
import React from "react";
import { AlertTriangle } from "react-feather";
import { ControlButtons, Heading, Paragraph } from "@shared/ui";
import { useDeleteStudentCourses } from "@entities/course";
import useStyles from "./DeleteStudentCourseModal.styles";

export interface DeleteStudentCourseModalProps {
    id: number;
    studentId: string;
    name?: string;
    onClose: () => void;
}

const DeleteStudentCourseModal = ({ id, studentId, name = "", onClose }: DeleteStudentCourseModalProps) => {
    const { classes } = useStyles();
    const deleteStudentCourse = useDeleteStudentCourses({ studentId, ids: [id], name });

    const handleSubmit = () => {
        deleteStudentCourse.mutate(null, {
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
                <Flex direction="column" gap={8}>
                    <Heading order={4}>Внимание!</Heading>
                    <Box>
                        <Paragraph variant="small-m" component="span">
                            {`Ученик потеряет доступ к учебному курсу, статистика по курсу будет удалена. Вы уверены, что хотите удалить доступ к курсу, `}
                        </Paragraph>
                        <Paragraph variant="small-semi" component="span">{`«${name}»?`}</Paragraph>
                    </Box>
                </Flex>
            </Flex>
            <ControlButtons
                variant="modal"
                cancelButtonText="Отмена"
                submitButtonText="Удалить"
                onSubmit={handleSubmit}
                onClose={onClose}
                isLoading={deleteStudentCourse.isLoading}
            />
        </Flex>
    );
};

export default DeleteStudentCourseModal;
