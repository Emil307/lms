import { Box, Flex, ThemeIcon } from "@mantine/core";
import React from "react";
import { AlertTriangle } from "react-feather";
import { Button, Paragraph } from "@shared/ui";
import { useDeleteUploadedFile } from "@entities/storage";
import { useMedia } from "@shared/utils";
import useStyles from "./DeleteMaterialModal.styles";

export interface DeleteMaterialModalProps {
    id: string;
    name: string;
    isSubcategory?: boolean;
    onClose: () => void;
}

const DeleteMaterialModal = ({ id, name, onClose }: DeleteMaterialModalProps) => {
    const { classes } = useStyles();

    const isMobile = useMedia("xs");

    const deleteMaterial = useDeleteUploadedFile(id, name);

    const handleSubmit = () => {
        deleteMaterial.mutate(null, {
            onSuccess: () => {
                onClose();
            },
        });
    };

    return (
        <Flex direction="column" gap={24}>
            <Flex gap={16} mih={80}>
                <ThemeIcon className={classes.warning}>
                    <AlertTriangle />
                </ThemeIcon>
                <Box>
                    <Paragraph variant="small-m" component="span">
                        {`Вы действительно хотите удалить материал, `}
                    </Paragraph>
                    <Paragraph variant="small-semi" component="span">{`«${id}: ${name}»?`}</Paragraph>
                </Box>
            </Flex>
            <Flex gap={8}>
                <Button size={isMobile ? "medium" : "large"} variant="border" onClick={onClose} loading={deleteMaterial.isLoading} w="100%">
                    Отмена
                </Button>
                <Button
                    size={isMobile ? "medium" : "large"}
                    variant="secondary"
                    onClick={handleSubmit}
                    loading={deleteMaterial.isLoading}
                    w="100%">
                    Удалить
                </Button>
            </Flex>
        </Flex>
    );
};

export default DeleteMaterialModal;
