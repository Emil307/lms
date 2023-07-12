import { Flex, Stack, Text, useMantineTheme } from "@mantine/core";
import React from "react";
import { AlertTriangle } from "react-feather";
import { Button } from "@shared/ui";
import { useAdminDeleteCourseFromCourseCollection } from "@entities/courseCollection";
import useStyles from "./DeleteCourseFromCourseCollectionModal.styles";

export interface DeleteCourseFromCourseCollectionModalProps {
    id: number;
    name?: string;
    courseCollectionId: string;
    onClose: () => void;
}

const DeleteCourseFromCourseCollectionModal = ({ id, name, courseCollectionId, onClose }: DeleteCourseFromCourseCollectionModalProps) => {
    const theme = useMantineTheme();
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
        <Stack>
            <Flex gap={16} mih={80}>
                <Flex align="center" justify="center" className={classes.warning}>
                    <AlertTriangle color={theme.colors.secondary[0]} />
                </Flex>
                <Text className={classes.text}>{`Вы действительно хотите удалить курс из подборки, «${id}: ${name}»?`}</Text>
            </Flex>
            <Flex gap={8}>
                <Button size="large" variant="border" onClick={onClose} loading={deleteCourseFromCourseCollection.isLoading} w="100%">
                    Отмена
                </Button>
                <Button
                    size="large"
                    variant="secondary"
                    onClick={handleSubmit}
                    loading={deleteCourseFromCourseCollection.isLoading}
                    w="100%">
                    Удалить
                </Button>
            </Flex>
        </Stack>
    );
};

export default DeleteCourseFromCourseCollectionModal;
