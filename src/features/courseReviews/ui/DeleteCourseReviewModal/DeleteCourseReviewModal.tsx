import { Box, Flex, ThemeIcon } from "@mantine/core";
import React from "react";
import { AlertTriangle } from "react-feather";
import { Button, Paragraph } from "@shared/ui";
import { useDeleteCourseReview } from "@entities/courseReview";
import useStyles from "./DeleteCourseReviewModal.styles";
import { useMedia } from "@shared/utils";

export interface DeleteCourseReviewModalProps {
    id: string;
    fullName: string;
    onSuccess: () => void;
    onCancel: () => void;
}

const DeleteCourseReviewModal = ({ id, fullName, onSuccess, onCancel }: DeleteCourseReviewModalProps) => {
    const { classes } = useStyles();
    const isMobile = useMedia("xs");
    const deleteCourseReview = useDeleteCourseReview({ id });

    const handleSubmit = () => {
        deleteCourseReview.mutate(null, {
            onSuccess: () => {
                onSuccess();
            },
        });
    };

    return (
        <Flex direction="column" gap={24}>
            <Flex gap={16} mih={80}>
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
            <Flex gap={8}>
                <Button
                    size={isMobile ? "medium" : "large"}
                    variant="border"
                    onClick={onCancel}
                    loading={deleteCourseReview.isLoading}
                    w="100%">
                    Отмена
                </Button>
                <Button
                    size={isMobile ? "medium" : "large"}
                    variant="secondary"
                    onClick={handleSubmit}
                    loading={deleteCourseReview.isLoading}
                    w="100%">
                    Удалить
                </Button>
            </Flex>
        </Flex>
    );
};

export default DeleteCourseReviewModal;
