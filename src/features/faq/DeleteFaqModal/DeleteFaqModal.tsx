import { Flex, Box, ThemeIcon } from "@mantine/core";
import React from "react";
import { AlertTriangle } from "react-feather";
import { ControlButtons, Paragraph } from "@shared/ui";
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
            <ControlButtons
                variant="modal"
                cancelButtonText="Отмена"
                submitButtonText="Удалить"
                onSubmit={handleSubmit}
                onClose={onClose}
                isLoading={deleteFaq.isLoading}
            />
        </Flex>
    );
};

export default DeleteFaqModal;
