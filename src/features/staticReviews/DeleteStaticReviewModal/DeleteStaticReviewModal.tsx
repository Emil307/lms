import { Box, Flex, ThemeIcon } from "@mantine/core";
import React from "react";
import { AlertTriangle } from "react-feather";
import { Button, Paragraph } from "@shared/ui";
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
        <Flex direction="column" gap={24}>
            <Flex gap={16} mih={80}>
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
            <Flex gap={8}>
                <Button size="large" variant="border" onClick={onClose} loading={deleteStaticReview.isLoading} w="100%">
                    Отмена
                </Button>
                <Button size="large" variant="secondary" onClick={handleSubmit} loading={deleteStaticReview.isLoading} w="100%">
                    Удалить
                </Button>
            </Flex>
        </Flex>
    );
};

export default DeleteStaticReviewModal;
