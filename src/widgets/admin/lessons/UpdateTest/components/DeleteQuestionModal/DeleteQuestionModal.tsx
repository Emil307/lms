import useStyles from "./DeleteQuestionModal.styles";
import { Flex, ThemeIcon } from "@mantine/core";
import { AlertTriangle } from "react-feather";
import { Button, Paragraph } from "@shared/ui";
import React from "react";

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
                    <Paragraph variant="small-semi">{`«${questionName}»?`}</Paragraph>
                </Paragraph>
            </Flex>
            <Flex gap={8}>
                <Button size="large" variant="border" onClick={onCancel} w="50%">
                    Отмена
                </Button>
                <Button size="large" variant="secondary" onClick={onSuccess} w="50%">
                    Удалить
                </Button>
            </Flex>
        </Flex>
    );
};

export default DeleteQuestionModal;
