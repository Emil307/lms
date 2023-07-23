import { Flex, ThemeIcon } from "@mantine/core";
import React from "react";
import { AlertTriangle } from "react-feather";
import { Button, Paragraph } from "@shared/ui";
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
            <Flex gap={8}>
                <Button variant="border" size="large" fullWidth onClick={onClose} w="100%">
                    Закрыть
                </Button>
                <Button variant="secondary" size="large" fullWidth onClick={onSubmit} w="100%">
                    Сохранить
                </Button>
            </Flex>
        </>
    );
};

export default ConfirmActionModal;
