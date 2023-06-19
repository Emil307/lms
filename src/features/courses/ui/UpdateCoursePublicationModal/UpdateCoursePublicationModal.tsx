import { Box, Flex, ThemeIcon, Text } from "@mantine/core";
import React from "react";
import { AlertTriangle } from "react-feather";
import { Button } from "@shared/ui";
import { useUpdateCoursePublication } from "@entities/course";
import { createNotification, ToastType } from "@shared/utils";
import useStyles from "./UpdateCoursePublicationModal.styles";

export interface UpdateCoursePublicationModalProps {
    id: string;
    name: string;
    coverSrc?: string;
    onCancel: () => void;
    onSuccess: () => void;
}

const UpdateCoursePublicationModal = ({ id, name, coverSrc, onSuccess, onCancel }: UpdateCoursePublicationModalProps) => {
    const { classes } = useStyles();
    const { mutate: publishCourse, isLoading } = useUpdateCoursePublication(id);

    const handleSubmit = () => {
        publishCourse(true, {
            onSuccess: () => {
                createNotification({
                    type: ToastType.IMAGE,
                    srcImage: coverSrc,
                    title: "Курс опубликован",
                    message: name,
                });
                onSuccess();
            },
        });
    };

    return (
        <Flex direction="column" gap={56}>
            <Flex gap={16}>
                <Flex align="center" justify="center" className={classes.warning}>
                    <ThemeIcon variant="outline" color="secondary" sx={{ border: "none" }}>
                        <AlertTriangle />
                    </ThemeIcon>
                </Flex>
                <Box className={classes.textWrapper}>
                    <Text>
                        Вы действительно хотите опубликовать курс
                        <Text className={classes.textData}>{`«${name}»?`}</Text>
                    </Text>
                </Box>
            </Flex>
            <Flex gap={8}>
                <Button size="large" variant="border" onClick={onCancel} disabled={isLoading} w="50%">
                    Отмена
                </Button>
                <Button size="large" variant="secondary" onClick={handleSubmit} loading={isLoading} w="50%">
                    Продолжить
                </Button>
            </Flex>
        </Flex>
    );
};

export default UpdateCoursePublicationModal;
