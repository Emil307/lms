import { Box, Flex, ThemeIcon } from "@mantine/core";
import React from "react";
import { AlertTriangle } from "react-feather";
import { ControlButtons, Paragraph } from "@shared/ui";
import { useDeleteArticleCourse } from "@entities/article";
import useStyles from "./DeleteArticleCourseModal.styles";

export interface DeleteArticleCourseModalProps {
    id: number;
    articleId: string;
    name?: string;
    onClose: () => void;
}

const DeleteArticleCourseModal = ({ id, articleId, name = "", onClose }: DeleteArticleCourseModalProps) => {
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
        <Flex direction="column" gap={56}>
            <Flex gap={16}>
                <ThemeIcon className={classes.warning}>
                    <AlertTriangle />
                </ThemeIcon>
                <Box>
                    <Paragraph variant="small-m" component="span">
                        {`Вы действительно хотите удалить привязанный курс к статье, `}
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
                isLoading={deleteArticleCourse.isLoading}
            />
        </Flex>
    );
};

export default DeleteArticleCourseModal;
