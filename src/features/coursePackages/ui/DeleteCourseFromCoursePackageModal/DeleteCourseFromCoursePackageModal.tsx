import { Flex, Stack, Text, useMantineTheme } from "@mantine/core";
import React from "react";
import { AlertTriangle } from "react-feather";
import { Button } from "@shared/ui";
import { useDeleteCourseFromCoursePackage } from "@entities/coursePackage";
import useStyles from "./DeleteCourseFromCoursePackageModal.styles";

export interface DeleteCourseFromCoursePackageModalProps {
    id: number;
    name?: string;
    coursePackageId: string;
    onClose: () => void;
}

const DeleteCourseFromCoursePackageModal = ({ id, name, coursePackageId, onClose }: DeleteCourseFromCoursePackageModalProps) => {
    const theme = useMantineTheme();
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
        <Stack>
            <Flex gap={16} mih={80}>
                <Flex align="center" justify="center" className={classes.warning}>
                    <AlertTriangle color={theme.colors.secondary[0]} />
                </Flex>
                <Text className={classes.text}>{`Вы действительно хотите удалить курс из пакета, «${id}: ${name}»?`}</Text>
            </Flex>
            <Flex gap={8}>
                <Button size="large" variant="border" onClick={onClose} loading={deleteCourseFromPackage.isLoading} w="100%">
                    Отмена
                </Button>
                <Button size="large" variant="secondary" onClick={handleSubmit} loading={deleteCourseFromPackage.isLoading} w="100%">
                    Удалить
                </Button>
            </Flex>
        </Stack>
    );
};

export default DeleteCourseFromCoursePackageModal;
