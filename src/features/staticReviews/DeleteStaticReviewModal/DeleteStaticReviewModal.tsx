import { Box, Flex, ThemeIcon } from "@mantine/core";
import React from "react";
import { AlertTriangle } from "react-feather";
import { ControlButtons, Paragraph } from "@shared/ui";
import { useDeleteStaticReview } from "@entities/staticReview";
import useStyles from "./DeleteStaticReviewModal.styles";

export interface DeleteStaticReviewModalProps {
    id: string;
    name: string;
    onClose: () => void;
}

const DeleteStaticReviewModal = ({ id, name, onClose }: DeleteStaticReviewModalProps) => {
    const { classes } = useStyles();
    const deleteStaticReview = useDeleteStaticReview({ id });

    const handleSubmit = () => {
        deleteStaticReview.mutate(null, {
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
                        {`Вы действительно хотите удалить отзыв, `}
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
                isLoading={deleteStaticReview.isLoading}
            />
        </Flex>
    );
};

export default DeleteStaticReviewModal;
