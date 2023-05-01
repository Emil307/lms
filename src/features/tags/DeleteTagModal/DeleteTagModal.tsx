import { Box, Flex, useMantineTheme } from "@mantine/core";
import React from "react";
import { AlertTriangle } from "react-feather";
import { Button } from "@shared/ui";
import { useDeleteTag } from "@entities/tag";
import useStyles from "./DeleteTagModal.styles";

interface DeleteTagModalProps {
    id: string;
    name: string;
    onClose: () => void;
}

const DeleteTagModal = ({ id, name, onClose }: DeleteTagModalProps) => {
    const theme = useMantineTheme();
    const { classes } = useStyles();
    const deleteTag = useDeleteTag(id);

    const handleSubmit = () => {
        deleteTag.mutate(null, {
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
                <Box className={classes.text}>{`Вы действительно хотите удалить тег, «${id}: ${name}»?`}</Box>
            </Flex>
            <Flex gap={8}>
                <Button size="large" variant="border" onClick={onClose} loading={deleteTag.isLoading} w="100%">
                    Отмена
                </Button>
                <Button size="large" variant="secondary" onClick={handleSubmit} loading={deleteTag.isLoading} w="100%">
                    Удалить
                </Button>
            </Flex>
        </Flex>
    );
};

export default DeleteTagModal;
