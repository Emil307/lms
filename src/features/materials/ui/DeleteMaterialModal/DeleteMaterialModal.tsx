import { Flex, Stack, Text, useMantineTheme } from "@mantine/core";
import React from "react";
import { AlertTriangle } from "react-feather";
import { Button } from "@shared/ui";
import { useDeleteUploadedFile } from "@entities/storage";
import useStyles from "./DeleteMaterialModal.styles";

interface DeleteMaterialModalProps {
    id: string;
    name: string;
    isSubcategory?: boolean;
    onClose: () => void;
}

const DeleteMaterialModal = ({ id, name, onClose }: DeleteMaterialModalProps) => {
    const theme = useMantineTheme();
    const { classes } = useStyles();
    const deleteMaterial = useDeleteUploadedFile(id);

    const handleSubmit = () => {
        deleteMaterial.mutate(null, {
            onSuccess: () => {
                onClose();
            },
        });
    };

    return (
        <Stack>
            <Flex gap={16} mih={80}>
                <Flex align="center" justify="center" className={classes.warning}>
                    <AlertTriangle color={theme.colors.secondary[0]} />
                </Flex>
                <Text className={classes.text}>{`Вы действительно хотите удалить материал, «${id}: ${name}»?`}</Text>
            </Flex>
            <Flex gap={8}>
                <Button size="large" variant="border" onClick={onClose} loading={deleteMaterial.isLoading} w="100%">
                    Отмена
                </Button>
                <Button size="large" variant="secondary" onClick={handleSubmit} loading={deleteMaterial.isLoading} w="100%">
                    Удалить
                </Button>
            </Flex>
        </Stack>
    );
};

export default DeleteMaterialModal;
