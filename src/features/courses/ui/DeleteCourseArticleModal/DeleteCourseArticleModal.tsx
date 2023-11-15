import { Box, Flex, ThemeIcon } from "@mantine/core";
import React from "react";
import { AlertTriangle } from "react-feather";
import { ControlButtons, Paragraph } from "@shared/ui";
import { useDeleteCourseArticles } from "@entities/course";
import useStyles from "./DeleteCourseArticleModal.styles";

export interface DeleteCourseArticleModalProps {
    id: number;
    courseId: string;
    name?: string;
    onClose: () => void;
}

const DeleteCourseArticleModal = ({ id, courseId, name = "", onClose }: DeleteCourseArticleModalProps) => {
    const { classes } = useStyles();

    const deleteCourseArticles = useDeleteCourseArticles({ courseId, articleIds: [id], name });

    const handleSubmit = () => {
        deleteCourseArticles.mutate(null, {
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
                        {`Вы действительно хотите удалить привязанную статью к курсу, `}
                    </Paragraph>
                    <Paragraph variant="small-semi" component="span">{`«${id}: ${name}»?`}</Paragraph>
                </Box>
            </Flex>
            <ControlButtons
                variant="modal"
                cancelButtonText="Отмена"
                submitButtonText="Удалить"
                onSubmit={handleSubmit}
                onClose={onClose}
                isLoading={deleteCourseArticles.isLoading}
            />
        </Flex>
    );
};

export default DeleteCourseArticleModal;
