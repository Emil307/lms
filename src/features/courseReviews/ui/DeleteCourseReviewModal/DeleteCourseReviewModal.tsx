import { Box, Flex, ThemeIcon } from "@mantine/core";
import React from "react";
import { AlertTriangle } from "react-feather";
import { ControlButtons, Paragraph } from "@shared/ui";
import { useDeleteCourseReview } from "@entities/courseReview";
import useStyles from "./DeleteCourseReviewModal.styles";

export interface DeleteCourseReviewModalProps {
    id: string;
    fullName: string;
    onSuccess: () => void;
    onCancel: () => void;
}

const DeleteCourseReviewModal = ({ id, fullName, onSuccess, onCancel }: DeleteCourseReviewModalProps) => {
    const { classes } = useStyles();
    const deleteCourseReview = useDeleteCourseReview({ id });

    const handleSubmit = () => {
        deleteCourseReview.mutate(null, {
            onSuccess: () => {
                onSuccess();
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
                        {`Вы действительно хотите удалить отзыв, `}
                    </Paragraph>
                    <Paragraph variant="small-semi" component="span">{`«${id}: ${fullName}»?`}</Paragraph>
                </Box>
            </Flex>
            <ControlButtons
                variant="modal"
                cancelButtonText="Отмена"
                submitButtonText="Удалить"
                onSubmit={handleSubmit}
                onClose={onCancel}
                isLoading={deleteCourseReview.isLoading}
            />
        </Flex>
    );
};

export default DeleteCourseReviewModal;
