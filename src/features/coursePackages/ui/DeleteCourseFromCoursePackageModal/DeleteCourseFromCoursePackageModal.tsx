import { Box, Flex, ThemeIcon } from "@mantine/core";
import React from "react";
import { AlertTriangle } from "react-feather";
import { ControlButtons, Paragraph } from "@shared/ui";
import { useDeleteCourseFromCoursePackage } from "@entities/coursePackage";
import useStyles from "./DeleteCourseFromCoursePackageModal.styles";

export interface DeleteCourseFromCoursePackageModalProps {
    id: number;
    name?: string;
    coursePackageId: string;
    onClose: () => void;
}

const DeleteCourseFromCoursePackageModal = ({ id, name, coursePackageId, onClose }: DeleteCourseFromCoursePackageModalProps) => {
    const { classes } = useStyles();
    const deleteCourseFromPackage = useDeleteCourseFromCoursePackage({ coursePackageId, ids: [id.toString()] });

    const handleSubmit = () => {
        deleteCourseFromPackage.mutate(null, {
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
                        {"Вы действительно хотите удалить курс из пакета, "}
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
                isLoading={deleteCourseFromPackage.isLoading}
            />
        </Flex>
    );
};

export default DeleteCourseFromCoursePackageModal;
