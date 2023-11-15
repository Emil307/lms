import { Box, Flex, ThemeIcon } from "@mantine/core";
import React from "react";
import { AlertTriangle } from "react-feather";
import { ControlButtons, Paragraph } from "@shared/ui";
import { useDeleteAdvantage } from "@entities/staticPage";
import useStyles from "./DeleteAdvantageModal.styles";

export interface DeleteAdvantageModalProps {
    id: string;
    name: string;
    onClose: () => void;
}

const DeleteAdvantageModal = ({ id, name, onClose }: DeleteAdvantageModalProps) => {
    const { classes } = useStyles();
    const deleteAdvantage = useDeleteAdvantage(id);

    const handleSubmit = () => {
        deleteAdvantage.mutate(null, {
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
                        {"Вы действительно хотите удалить преимущество, "}
                    </Paragraph>
                    <Paragraph variant="small-semi" component="span">{`«${id}: ${name}»?`}</Paragraph>
                </Box>
            </Flex>
            <ControlButtons
                variant="modal"
                cancelButtonText="Отмена"
                submitButtonText="Удалить"
                onSubmit={handleSubmit}
                onClose={onClose}
                isLoading={deleteAdvantage.isLoading}
            />
        </Flex>
    );
};

export default DeleteAdvantageModal;
