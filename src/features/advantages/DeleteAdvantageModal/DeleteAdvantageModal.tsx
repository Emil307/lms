import { Flex, Text, useMantineTheme } from "@mantine/core";
import React from "react";
import { AlertTriangle } from "react-feather";
import { Button } from "@shared/ui";
import { useDeleteAdvantage } from "@entities/staticPage";
import useStyles from "./DeleteAdvantageModal.styles";

interface DeleteAdvantageModalProps {
    id: string;
    name: string;
    onClose: () => void;
}

const DeleteAdvantageModal = ({ id, name, onClose }: DeleteAdvantageModalProps) => {
    const theme = useMantineTheme();
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
        <Flex direction="column" gap={24}>
            <Flex gap={16} mih={80}>
                <Flex align="center" justify="center" className={classes.warning}>
                    <AlertTriangle color={theme.colors.secondary[0]} />
                </Flex>
                <Text className={classes.text}>{`Вы действительно хотите удалить преимущество, «${id}: ${name}»?`}</Text>
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
