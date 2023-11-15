import { Flex, ThemeIcon } from "@mantine/core";
import React from "react";
import { AlertTriangle } from "react-feather";
import { ControlButtons, Paragraph } from "@shared/ui";
import useStyles from "./ConfirmActionModal.styles";

export interface ConfirmActionModalProps {
    onSubmit: () => void;
    onClose: () => void;
}

const ConfirmActionModal = ({ onSubmit, onClose }: ConfirmActionModalProps) => {
    const { classes } = useStyles();

    return (
        <>
            <Flex gap={16} pb={56}>
                <ThemeIcon className={classes.wrapperAlertIcon} radius={50}>
                    <AlertTriangle />
                </ThemeIcon>
                <Paragraph variant="small-m">Вы хотите сохранить изменения перед закрытием?</Paragraph>
            </Flex>
            <ControlButtons variant="modal" cancelButtonText="Закрыть" submitButtonText="Сохранить" onSubmit={onSubmit} onClose={onClose} />
        </>
    );
};

export default ConfirmActionModal;
