import { Flex, Stack, Text, useMantineTheme } from "@mantine/core";
import React from "react";
import { AlertTriangle } from "react-feather";
import { Button } from "@shared/ui";
import { useAdminDeleteCourseCollection } from "@entities/courseCollection";
import useStyles from "./DeleteCourseCollectionModal.styles";

export interface DeleteCourseCollectionModalProps {
    id: string;
    name?: string;
    onClose: () => void;
}

const DeleteCourseCollectionModal = ({ id, name, onClose }: DeleteCourseCollectionModalProps) => {
    const theme = useMantineTheme();
    const { classes } = useStyles();
    const deleteCourseCollection = useAdminDeleteCourseCollection({ id });

    const handleSubmit = () => {
        deleteCourseCollection.mutate(null, {
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
                <Text className={classes.text}>{`Вы действительно хотите удалить подборку, «${id}: ${name}»?`}</Text>
            </Flex>
            <Flex gap={8}>
                <Button size="large" variant="border" onClick={onClose} loading={deleteCourseCollection.isLoading} w="100%">
                    Отмена
                </Button>
                <Button size="large" variant="secondary" onClick={handleSubmit} loading={deleteCourseCollection.isLoading} w="100%">
                    Удалить
                </Button>
            </Flex>
        </Stack>
    );
};

export default DeleteCourseCollectionModal;
