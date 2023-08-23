import { Box, Flex, ThemeIcon } from "@mantine/core";
import React from "react";
import { AlertTriangle } from "react-feather";
import { Button, Paragraph } from "@shared/ui";
import { useDeleteAuthor } from "@entities/author";
import { useMedia } from "@shared/utils";
import useStyles from "./DeleteAuthorModal.styles";

export interface DeleteAuthorModalProps {
    id: string;
    fullName: string;
    onClose: () => void;
}

const DeleteAuthorModal = ({ id, fullName, onClose }: DeleteAuthorModalProps) => {
    const { classes } = useStyles();
    const deleteAuthor = useDeleteAuthor({ id, name: fullName });

    const isMobile = useMedia("xs");

    const handleSubmit = () => {
        deleteAuthor.mutate(null, {
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
