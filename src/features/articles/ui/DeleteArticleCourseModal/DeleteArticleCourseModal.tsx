import { Flex, Text, useMantineTheme } from "@mantine/core";
import React from "react";
import { AlertTriangle } from "react-feather";
import { Button } from "@shared/ui";
import { useDeleteArticleCourse } from "@entities/article";
import useStyles from "./DeleteArticleCourseModal.styles";

export interface DeleteArticleCourseModalProps {
    id: number;
    articleId: string;
    name?: string;
    onClose: () => void;
}

const DeleteArticleCourseModal = ({ id, articleId, name = "", onClose }: DeleteArticleCourseModalProps) => {
    const theme = useMantineTheme();
    const { classes } = useStyles();
    const deleteArticleCourse = useDeleteArticleCourse({ articleId, courseId: id });

    const handleSubmit = () => {
        deleteArticleCourse.mutate(null, {
            onSuccess: () => {
                onClose();
            },
        });
    };

    return (
        <Flex direction="column" gap={24}>
            <Flex gap={16} mih={80}>
                <Flex align="center" justify="center" className={classes.warning}>
                    <AlertTriangle color={theme.colors.secondary[0]} />
                </Flex>
                <Text className={classes.text}>{`Вы действительно хотите удалить привязанный курс к статье, «${id}: ${name}»?`}</Text>
            </Flex>
            <Flex gap={8}>
                <Button size="large" variant="border" onClick={onClose} loading={deleteArticleCourse.isLoading} w="100%">
                    Отмена
                </Button>
                <Button size="large" variant="secondary" onClick={handleSubmit} loading={deleteArticleCourse.isLoading} w="100%">
                    Удалить
                </Button>
            </Flex>
        </Flex>
    );
};

export default DeleteArticleCourseModal;
