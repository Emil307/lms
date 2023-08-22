import { Box, Flex, ThemeIcon } from "@mantine/core";
import React from "react";
import { AlertTriangle } from "react-feather";
import { Button, Paragraph } from "@shared/ui";
import { useDeleteTag } from "@entities/tag";
import { useMedia } from "@shared/utils";
import useStyles from "./DeleteTagModal.styles";

interface DeleteTagModalProps {
    id: string;
    name: string;
    onClose: () => void;
}

const DeleteTagModal = ({ id, name, onClose }: DeleteTagModalProps) => {
    const { classes } = useStyles();
    const deleteTag = useDeleteTag({ id });

    const isMobile = useMedia("xs");

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
                <ThemeIcon className={classes.warning}>
                    <AlertTriangle />
                </ThemeIcon>
                <Box>
                    <Paragraph variant="small-m" component="span">
                        {`Вы действительно хотите удалить тег, `}
                    </Paragraph>
                    <Paragraph variant="small-semi" component="span">{`«${id}: ${name}»?`}</Paragraph>
                </Box>
            </Flex>
            <Flex gap={8}>
                <Button size={isMobile ? "medium" : "large"} variant="border" onClick={onClose} loading={deleteTag.isLoading} w="100%">
                    Отмена
                </Button>
                <Button
                    size={isMobile ? "medium" : "large"}
                    variant="secondary"
                    onClick={handleSubmit}
                    loading={deleteTag.isLoading}
                    w="100%">
                    Удалить
                </Button>
            </Flex>
        </Flex>
    );
};

export default DeleteTagModal;
