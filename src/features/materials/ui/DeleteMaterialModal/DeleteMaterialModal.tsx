import { Box, Flex, ThemeIcon } from "@mantine/core";
import React from "react";
import { AlertTriangle } from "react-feather";
import { ControlButtons, Paragraph } from "@shared/ui";
import { useDeleteUploadedFile } from "@entities/storage";
import useStyles from "./DeleteMaterialModal.styles";

export interface DeleteMaterialModalProps {
    id: string;
    name: string;
    isSubcategory?: boolean;
    onClose: () => void;
}

const DeleteMaterialModal = ({ id, name, onClose }: DeleteMaterialModalProps) => {
    const { classes } = useStyles();

    const deleteMaterial = useDeleteUploadedFile(id, name);

    const handleSubmit = () => {
        deleteMaterial.mutate(null, {
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
                        {`Вы действительно хотите удалить материал, `}
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
                isLoading={deleteMaterial.isLoading}
            />
        </Flex>
    );
};

export default DeleteMaterialModal;
