import { Box, Flex, ThemeIcon } from "@mantine/core";
import React from "react";
import { AlertTriangle } from "react-feather";
import { Button, Paragraph } from "@shared/ui";
import { useAdminDeleteGroup } from "@entities/group";
import { useMedia } from "@shared/utils";
import useStyles from "./DeleteGroupModal.styles";

export interface DeleteGroupModalProps {
    id: string;
    name?: string;
    onClose: () => void;
}

const DeleteGroupModal = ({ id, name = "", onClose }: DeleteGroupModalProps) => {
    const { classes } = useStyles();
    const deleteGroup = useAdminDeleteGroup({ id });

    const isTablet = useMedia("md");

    const handleSubmit = () => {
        deleteGroup.mutate(null, {
            onSuccess: () => {
                onClose();
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
            <Flex gap={8} mt={56}>
                <Button size={isTablet ? "medium" : "large"} variant="border" onClick={onClose} disabled={deleteGroup.isLoading} w="50%">
                    Отмена
                </Button>
                <Button
                    size={isTablet ? "medium" : "large"}
                    variant="secondary"
                    onClick={handleSubmit}
                    loading={deleteGroup.isLoading}
                    w="50%">
                    Удалить
                </Button>
            </Flex>
        </Box>
    );
};

export default DeleteGroupModal;
