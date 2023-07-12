import { Flex, Text, useMantineTheme } from "@mantine/core";
import React from "react";
import { AlertTriangle } from "react-feather";
import { Button } from "@shared/ui";
import { useDeleteStaticReview } from "@entities/staticReview";
import useStyles from "./DeleteStaticReviewModal.styles";

export interface DeleteStaticReviewModalProps {
    id: string;
    name: string;
    onClose: () => void;
}

const DeleteStaticReviewModal = ({ id, name, onClose }: DeleteStaticReviewModalProps) => {
    const theme = useMantineTheme();
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
                <Flex align="center" justify="center" className={classes.warning}>
                    <AlertTriangle color={theme.colors.secondary[0]} />
                </Flex>
                <Text className={classes.text}>{`Вы действительно хотите удалить отзыв, «${id}: ${name}»?`}</Text>
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
