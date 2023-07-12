import { Flex, Stack, Text, useMantineTheme } from "@mantine/core";
import React from "react";
import { AlertTriangle } from "react-feather";
import { useRouter } from "next/router";
import { Button } from "@shared/ui";
import { useDeleteCoursePackage } from "@entities/coursePackage";
import useStyles from "./DeleteCoursePackageModal.styles";

export interface DeleteCoursePackageModalProps {
    id: string;
    name?: string;
    onClose: () => void;
}

const DeleteCoursePackageModal = ({ id, name, onClose }: DeleteCoursePackageModalProps) => {
    const theme = useMantineTheme();
    const router = useRouter();
    const { classes } = useStyles();
    const deleteCoursePackage = useDeleteCoursePackage(id);

    const handleSubmit = () => {
        deleteCoursePackage.mutate(null, {
            onSuccess: () => {
                onClose();
                router.push("/admin/settings/course-packages");
            },
        });
    };

    return (
        <Stack>
            <Flex gap={16} mih={80}>
                <Flex align="center" justify="center" className={classes.warning}>
                    <AlertTriangle color={theme.colors.secondary[0]} />
                </Flex>
                <Text className={classes.text}>{`Вы действительно хотите удалить пакет курсов, «${id}: ${name}»?`}</Text>
            </Flex>
            <Flex gap={8}>
                <Button size="large" variant="border" onClick={onClose} loading={deleteCoursePackage.isLoading} w="100%">
                    Отмена
                </Button>
                <Button size="large" variant="secondary" onClick={handleSubmit} loading={deleteCoursePackage.isLoading} w="100%">
                    Удалить
                </Button>
            </Flex>
        </Stack>
    );
};

export default DeleteCoursePackageModal;
