import { Box, Flex, ThemeIcon } from "@mantine/core";
import React from "react";
import { AlertTriangle } from "react-feather";
import { ControlButtons, Paragraph } from "@shared/ui";
import { useDeleteCoursePackage } from "@entities/coursePackage";
import useStyles from "./DeleteCoursePackageModal.styles";

export interface DeleteCoursePackageModalProps {
    id: string;
    name?: string;
    onSuccess: () => void;
    onCancel: () => void;
}

const DeleteCoursePackageModal = ({ id, name, onSuccess, onCancel }: DeleteCoursePackageModalProps) => {
    const { classes } = useStyles();
    const deleteCoursePackage = useDeleteCoursePackage(id);

    const handleSubmit = () => {
        deleteCoursePackage.mutate(null, {
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
                        {"Вы действительно хотите удалить пакет курсов, "}
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
                isLoading={deleteCoursePackage.isLoading}
            />
        </Flex>
    );
};

export default DeleteCoursePackageModal;
