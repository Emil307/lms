import { Box, Flex, ThemeIcon } from "@mantine/core";
import React from "react";
import { AlertTriangle } from "react-feather";
import { Button, Paragraph } from "@shared/ui";
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
        <Flex direction="column" gap={24}>
            <Flex gap={16} mih={80}>
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
            <Flex gap={8}>
                <Button size="large" variant="border" onClick={onClose} loading={deleteCourseFromPackage.isLoading} w="100%">
                    Отмена
                </Button>
                <Button size="large" variant="secondary" onClick={handleSubmit} loading={deleteCourseFromPackage.isLoading} w="100%">
                    Удалить
                </Button>
            </Flex>
        </Flex>
    );
};

export default DeleteCourseFromCoursePackageModal;
