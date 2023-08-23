import { Box, Flex, ThemeIcon } from "@mantine/core";
import React from "react";
import { AlertTriangle } from "react-feather";
import { Button, Heading, Paragraph } from "@shared/ui";
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
        <Flex direction="column" gap={24}>
            <Flex gap={16} mih={80}>
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
            <Flex gap={8}>
                <Button size="large" variant="border" onClick={onClose} loading={deleteStudentCourse.isLoading} w="100%">
                    Отмена
                </Button>
                <Button size="large" variant="secondary" onClick={handleSubmit} loading={deleteStudentCourse.isLoading} w="100%">
                    Удалить
                </Button>
            </Flex>
        </Flex>
    );
};

export default DeleteStudentCourseModal;
