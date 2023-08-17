import { Flex, ThemeIcon } from "@mantine/core";
import { AlertTriangle } from "react-feather";
import React from "react";
import { useMediaQuery } from "@mantine/hooks";
import { Button, Paragraph } from "@shared/ui";
import useStyles from "./DeleteQuestionModal.styles";

interface DeleteQuestionModalProps {
    questionName: string;
    onCancel: () => void;
    onSuccess: () => void;
}

const DeleteQuestionModal = ({ questionName, onSuccess, onCancel }: DeleteQuestionModalProps) => {
    const { classes } = useStyles();

    const isMobile = useMediaQuery("(max-width: 744px)");

    return (
        <Flex direction="column" gap={56}>
            <Flex gap={16} align="center">
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
            <Flex gap={8}>
                <Button size={isMobile ? "medium" : "large"} variant="border" onClick={onCancel} w="50%">
                    Отмена
                </Button>
                <Button size={isMobile ? "medium" : "large"} variant="secondary" onClick={onSuccess} w="50%">
                    Удалить
                </Button>
            </Flex>
        </Flex>
    );
};

export default DeleteQuestionModal;
