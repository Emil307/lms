import { Box, Flex, ThemeIcon } from "@mantine/core";
import React from "react";
import { AlertTriangle } from "react-feather";
import { Button, Paragraph } from "@shared/ui";
import { useUpdateCoursePublication } from "@entities/course";
import { createNotification, ToastType, useMedia } from "@shared/utils";
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
    const { mutate: publishCourse, isLoading } = useUpdateCoursePublication({ id });

    const isTablet = useMedia("md");

    const handleSubmit = () => {
        publishCourse(
            { isFulfillment: true },
            {
                onSuccess: () => {
                    createNotification({
                        type: ToastType.IMAGE,
                        srcImage: coverSrc,
                        title: "Курс опубликован",
                        message: name,
                    });
                    onSuccess();
                },
            }
        );
    };

    return (
        <Flex direction="column" gap={56}>
            <Flex gap={16}>
                <ThemeIcon className={classes.warning}>
                    <AlertTriangle />
                </ThemeIcon>
                <Box>
                    <Paragraph variant="small-m" component="span">
                        {"Вы действительно хотите опубликовать курс "}
                    </Paragraph>
                    <Paragraph variant="small-semi" component="span">{`«${name}»?`}</Paragraph>
                </Box>
            </Flex>
            <Flex gap={8}>
                <Button size={isTablet ? "medium" : "large"} variant="border" onClick={onCancel} disabled={isLoading} w="50%">
                    Отмена
                </Button>
                <Button size={isTablet ? "medium" : "large"} variant="secondary" onClick={handleSubmit} loading={isLoading} w="50%">
                    Продолжить
                </Button>
            </Flex>
        </Flex>
    );
};

export default UpdateCoursePublicationModal;
