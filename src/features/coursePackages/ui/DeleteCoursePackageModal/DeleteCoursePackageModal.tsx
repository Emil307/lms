import { Box, Flex, ThemeIcon } from "@mantine/core";
import React from "react";
import { AlertTriangle } from "react-feather";
import { useRouter } from "next/router";
import { Button, Paragraph } from "@shared/ui";
import { useDeleteCoursePackage } from "@entities/coursePackage";
import useStyles from "./DeleteCoursePackageModal.styles";

export interface DeleteCoursePackageModalProps {
    id: string;
    name?: string;
    onClose: () => void;
}

const DeleteCoursePackageModal = ({ id, name, onClose }: DeleteCoursePackageModalProps) => {
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
        <Flex direction="column" gap={24}>
            <Flex gap={16} mih={80}>
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
            <Flex gap={8}>
                <Button size="large" variant="border" onClick={onClose} loading={deleteCoursePackage.isLoading} w="100%">
                    Отмена
                </Button>
                <Button size="large" variant="secondary" onClick={handleSubmit} loading={deleteCoursePackage.isLoading} w="100%">
                    Удалить
                </Button>
            </Flex>
        </Flex>
    );
};

export default DeleteCoursePackageModal;
