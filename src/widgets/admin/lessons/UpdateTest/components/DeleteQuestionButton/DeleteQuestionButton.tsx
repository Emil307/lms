import { Trash as TrashIcon } from "react-feather";
import React from "react";
import { closeModal, openModal } from "@mantine/modals";
import { useMediaQuery } from "@mantine/hooks";
import { ActionIcon } from "@mantine/core";
import { createNotification, ToastType } from "@shared/utils";
import { Button } from "@shared/ui";
import useStyles from "./DeleteQuestionButton.styles";
import { DeleteQuestionModal } from "../DeleteQuestionModal";

interface DeleteQuestionButtonProps {
    questionName: string;
    index: number;
    onDeleteQuestion: (index: number) => void;
}

const DeleteQuestionButton = ({ questionName, index, onDeleteQuestion }: DeleteQuestionButtonProps) => {
    const { classes } = useStyles();

    const isMobile = useMediaQuery("(max-width: 744px)");

    const handleCloseDeleteQuestionModal = () => closeModal("DELETE_QUESTION_FROM_TEST");

    const handleSuccessDeleteQuestion = () => {
        createNotification({
            type: ToastType.SUCCESS,
            title: "Вопрос успешно удален",
        });
        onDeleteQuestion(index);
        handleCloseDeleteQuestionModal();
    };

    const handleOpenDeleteQuestionModal = () => {
        openModal({
            modalId: "DELETE_QUESTION_FROM_TEST",
            title: "Удаление вопроса",
            children: (
                <DeleteQuestionModal
                    questionName={questionName}
                    onSuccess={handleSuccessDeleteQuestion}
                    onCancel={handleCloseDeleteQuestionModal}
                />
            ),
        });
    };

    if (isMobile) {
        return (
            <ActionIcon color="dark" onClick={handleOpenDeleteQuestionModal}>
                <TrashIcon />
            </ActionIcon>
        );
    }

    return (
        <Button size="small" variant="white" onClick={handleOpenDeleteQuestionModal} leftIcon={<TrashIcon />} className={classes.button}>
            Удалить вопрос
        </Button>
    );
};

export default DeleteQuestionButton;
