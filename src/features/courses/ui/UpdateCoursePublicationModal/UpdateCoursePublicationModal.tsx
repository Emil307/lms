import { Box, Flex, ThemeIcon } from "@mantine/core";
import React from "react";
import { AlertTriangle } from "react-feather";
import { ControlButtons, Paragraph } from "@shared/ui";
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
    const { mutate: publishCourse, isLoading } = useUpdateCoursePublication({ id });

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
            <ControlButtons
                variant="modal"
                cancelButtonText="Отмена"
                submitButtonText="Продолжить"
                onSubmit={handleSubmit}
                onClose={onCancel}
                isLoading={isLoading}
            />
        </Flex>
    );
};

export default UpdateCoursePublicationModal;
