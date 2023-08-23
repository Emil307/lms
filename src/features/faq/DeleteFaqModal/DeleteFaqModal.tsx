import { Flex, Box, ThemeIcon } from "@mantine/core";
import React from "react";
import { AlertTriangle } from "react-feather";
import { Button, Paragraph } from "@shared/ui";
import { useDeleteFaq } from "@entities/staticPage";
import useStyles from "./DeleteFaqModal.styles";

interface DeleteFaqModalProps {
    id: number;
    question?: string;
    onClose: () => void;
}

const DeleteFaqModal = ({ id, question = "", onClose }: DeleteFaqModalProps) => {
    const { classes } = useStyles();
    const deleteFaq = useDeleteFaq(id);

    const handleSubmit = () => {
        deleteFaq.mutate(null, {
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
                        Вы действительно хотите удалить вопрос
                    </Paragraph>
                    <Paragraph variant="small-semi" component="span">
                        {` «${question}»?`}
                    </Paragraph>
                </Box>
            </Flex>
            <Flex gap={8}>
                <Button size="large" variant="border" onClick={onClose} loading={deleteFaq.isLoading} w="100%">
                    Отмена
                </Button>
                <Button size="large" variant="secondary" onClick={handleSubmit} loading={deleteFaq.isLoading} w="100%">
                    Удалить
                </Button>
            </Flex>
        </Flex>
    );
};

export default DeleteFaqModal;
