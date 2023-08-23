import { Box, Flex, ThemeIcon } from "@mantine/core";
import React from "react";
import { AlertTriangle } from "react-feather";
import { Button, Paragraph } from "@shared/ui";
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
            <Flex gap={8}>
                <Button size="large" variant="border" onClick={onClose} loading={deleteAdvantage.isLoading} w="100%">
                    Отмена
                </Button>
                <Button size="large" variant="secondary" onClick={handleSubmit} loading={deleteAdvantage.isLoading} w="100%">
                    Удалить
                </Button>
            </Flex>
        </Flex>
    );
};

export default DeleteAdvantageModal;
