import { Box, Flex, ThemeIcon } from "@mantine/core";
import React from "react";
import { AlertTriangle } from "react-feather";
import { useMediaQuery } from "@mantine/hooks";
import { Button, Paragraph } from "@shared/ui";
import { useDeleteAuthor } from "@entities/author";
import useStyles from "./DeleteAuthorModal.styles";

export interface DeleteAuthorModalProps {
    id: string;
    fullName: string;
    onClose: () => void;
}

const DeleteAuthorModal = ({ id, fullName, onClose }: DeleteAuthorModalProps) => {
    const { classes } = useStyles();
    const deleteAuthor = useDeleteAuthor({ id });

    const isMobile = useMediaQuery("(max-width: 576px)");

    const handleSubmit = () => {
        deleteAuthor.mutate(null, {
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
                        {`Вы действительно хотите удалить автора, `}
                    </Paragraph>
                    <Paragraph variant="small-semi" component="span">{`«${id}: ${fullName}»?`}</Paragraph>
                </Box>
            </Flex>
            <Flex gap={8}>
                <Button size={isMobile ? "medium" : "large"} variant="border" onClick={onClose} loading={deleteAuthor.isLoading} w="100%">
                    Отмена
                </Button>
                <Button
                    size={isMobile ? "medium" : "large"}
                    variant="secondary"
                    onClick={handleSubmit}
                    loading={deleteAuthor.isLoading}
                    w="100%">
                    Удалить
                </Button>
            </Flex>
        </Flex>
    );
};

export default DeleteAuthorModal;
