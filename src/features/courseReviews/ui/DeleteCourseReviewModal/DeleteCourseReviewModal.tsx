import { Box, Flex, Stack, useMantineTheme } from "@mantine/core";
import React from "react";
import { AlertTriangle } from "react-feather";
import { Button } from "@shared/ui";
import { useDeleteCourseReview } from "@entities/courseReview";
import useStyles from "./DeleteCourseReviewModal.styles";

export interface DeleteCourseReviewModalProps {
    id: string;
    fullName: string;
    onClose: () => void;
}

const DeleteCourseReviewModal = ({ id, fullName, onClose }: DeleteCourseReviewModalProps) => {
    const theme = useMantineTheme();
    const { classes } = useStyles();
    const deleteCourseReview = useDeleteCourseReview({ id });

    const handleSubmit = () => {
        deleteCourseReview.mutate(null, {
            onSuccess: () => {
                onClose();
            },
        });
    };

    return (
        <Stack>
            <Flex gap={16} mih={80}>
                <Flex align="center" justify="center" className={classes.warning}>
                    <AlertTriangle color={theme.colors.secondary[0]} />
                </Flex>
                <Box className={classes.text}>{`Вы действительно хотите удалить отзыв, «${id}: ${fullName}»?`}</Box>
            </Flex>
            <Flex gap={8}>
                <Button size="large" variant="border" onClick={onClose} loading={deleteCourseReview.isLoading} w="100%">
                    Отмена
                </Button>
                <Button size="large" variant="secondary" onClick={handleSubmit} loading={deleteCourseReview.isLoading} w="100%">
                    Удалить
                </Button>
            </Flex>
        </Stack>
    );
};

export default DeleteCourseReviewModal;
