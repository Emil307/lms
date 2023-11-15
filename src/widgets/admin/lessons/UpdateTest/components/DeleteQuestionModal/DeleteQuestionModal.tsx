import { Flex, ThemeIcon } from "@mantine/core";
import { AlertTriangle } from "react-feather";
import React from "react";
import { ControlButtons, Paragraph } from "@shared/ui";
import useStyles from "./DeleteQuestionModal.styles";

interface DeleteQuestionModalProps {
    questionName: string;
    onCancel: () => void;
    onSuccess: () => void;
}

const DeleteQuestionModal = ({ questionName, onSuccess, onCancel }: DeleteQuestionModalProps) => {
    const { classes } = useStyles();

    return (
        <Flex direction="column" gap={56}>
            <Flex gap={16}>
                <Flex align="center" justify="center" className={classes.warning}>
                    <ThemeIcon color="secondary">
                        <AlertTriangle />
                    </ThemeIcon>
                </Flex>
                <Paragraph variant="small-m">
                    Вы действительно хотите удалить вопрос,
                    <Paragraph className={classes.questionName} variant="small-semi">{`«${questionName}»?`}</Paragraph>
                </Paragraph>
            </Flex>
            <ControlButtons variant="modal" cancelButtonText="Отмена" submitButtonText="Удалить" onSubmit={onSuccess} onClose={onCancel} />
        </Flex>
    );
};

export default DeleteQuestionModal;
