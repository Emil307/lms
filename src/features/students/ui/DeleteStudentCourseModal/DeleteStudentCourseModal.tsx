import { Flex, ThemeIcon, useMantineTheme } from "@mantine/core";
import React from "react";
import { AlertTriangle } from "react-feather";
import { Button, Heading, Paragraph } from "@shared/ui";
import { useDeleteStudentCourses } from "@entities/user";
import useStyles from "./DeleteStudentCourseModal.styles";

export interface DeleteStudentCourseModalProps {
    id: number;
    studentId: string;
    name?: string;
    onClose: () => void;
}

const DeleteStudentCourseModal = ({ id, studentId, name = "", onClose }: DeleteStudentCourseModalProps) => {
    const theme = useMantineTheme();
    const { classes } = useStyles();
    const deleteStudentCourse = useDeleteStudentCourses({ studentId, ids: [id] });

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
                <ThemeIcon className={classes.warningIconWrapper}>
                    <AlertTriangle color={theme.colors.secondary[0]} />
                </ThemeIcon>
                <Flex direction="column" gap={8}>
                    <Heading order={4}>Внимание!</Heading>
                    <Paragraph
                        variant="small-semi"
                        fw={
                            500
                        }>{`Ученик потеряет доступ к учебному курсу, статистика по курсу будет удалена. Вы уверены, что хотите удалить доступ к курсу, «${name}»?`}</Paragraph>
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
