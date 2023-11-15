import { Box, Flex, ThemeIcon } from "@mantine/core";
import React from "react";
import { AlertTriangle } from "react-feather";
import { ControlButtons, Paragraph } from "@shared/ui";
import { useAdminDeleteGroup } from "@entities/group";
import useStyles from "./DeleteGroupModal.styles";

export interface DeleteGroupModalProps {
    id: string;
    name?: string;
    onSuccess: () => void;
    onCancel: () => void;
}

const DeleteGroupModal = ({ id, name = "", onSuccess, onCancel }: DeleteGroupModalProps) => {
    const { classes } = useStyles();
    const deleteGroup = useAdminDeleteGroup({ id, name });

    const handleSubmit = () => {
        deleteGroup.mutate(null, {
            onSuccess: () => {
                onSuccess();
            },
        });
    };

    return (
        <Box>
            <Flex gap={16}>
                <ThemeIcon className={classes.warning}>
                    <AlertTriangle />
                </ThemeIcon>
                <Box>
                    <Paragraph variant="small-m" component="span">
                        {"Вы действительно хотите удалить группу, "}
                    </Paragraph>
                    <Paragraph variant="small-semi" component="span">{`«${id}: ${name}»?`}</Paragraph>
                </Box>
            </Flex>
            <ControlButtons
                variant="modal"
                cancelButtonText="Отмена"
                submitButtonText="Удалить"
                onSubmit={handleSubmit}
                onClose={onCancel}
                isLoading={deleteGroup.isLoading}
                mt={56}
            />
        </Box>
    );
};

export default DeleteGroupModal;
