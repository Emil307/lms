import { Box, Flex, ThemeIcon } from "@mantine/core";
import React from "react";
import { AlertTriangle } from "react-feather";
import { ControlButtons, Paragraph } from "@shared/ui";
import { useDeleteTag } from "@entities/tag";
import useStyles from "./DeleteTagModal.styles";

interface DeleteTagModalProps {
    id: string;
    name: string;
    onClose: () => void;
}

const DeleteTagModal = ({ id, name, onClose }: DeleteTagModalProps) => {
    const { classes } = useStyles();
    const deleteTag = useDeleteTag({ id, name });

    const handleSubmit = () => {
        deleteTag.mutate(null, {
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
                        {`Вы действительно хотите удалить тег, `}
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
                isLoading={deleteTag.isLoading}
            />
        </Flex>
    );
};

export default DeleteTagModal;
