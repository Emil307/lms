import { Box, Flex, ThemeIcon } from "@mantine/core";
import React from "react";
import { AlertTriangle } from "react-feather";
import { ControlButtons, Paragraph } from "@shared/ui";
import { useAdminDeleteCourseFromCourseCollection } from "@entities/courseCollection";
import useStyles from "./DeleteCourseFromCourseCollectionModal.styles";

export interface DeleteCourseFromCourseCollectionModalProps {
    id: number;
    name?: string;
    courseCollectionId: string;
    onClose: () => void;
}

const DeleteCourseFromCourseCollectionModal = ({ id, name, courseCollectionId, onClose }: DeleteCourseFromCourseCollectionModalProps) => {
    const { classes } = useStyles();

    const deleteCourseFromCourseCollection = useAdminDeleteCourseFromCourseCollection({ courseCollectionId, ids: [id] });

    const handleSubmit = () => {
        deleteCourseFromCourseCollection.mutate(null, {
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
                        {`Вы действительно хотите удалить курс из подборки, `}
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
                isLoading={deleteCourseFromCourseCollection.isLoading}
            />
        </Flex>
    );
};

export default DeleteCourseFromCourseCollectionModal;
