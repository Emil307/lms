import { Box, Flex, ThemeIcon } from "@mantine/core";
import React from "react";
import { AlertTriangle } from "react-feather";
import { ControlButtons, Paragraph } from "@shared/ui";
import { useAdminDeleteCourseCollection } from "@entities/courseCollection";
import useStyles from "./DeleteCourseCollectionModal.styles";

export interface DeleteCourseCollectionModalProps {
    id: string;
    name?: string;
    onSuccess: () => void;
    onCancel: () => void;
}

const DeleteCourseCollectionModal = ({ id, name, onSuccess, onCancel }: DeleteCourseCollectionModalProps) => {
    const { classes } = useStyles();

    const deleteCourseCollection = useAdminDeleteCourseCollection({ id });

    const handleSubmit = () => {
        deleteCourseCollection.mutate(null, {
            onSuccess: () => {
                onSuccess();
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
                        {`Вы действительно хотите удалить подборку, `}
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
                isLoading={deleteCourseCollection.isLoading}
            />
        </Flex>
    );
};

export default DeleteCourseCollectionModal;
