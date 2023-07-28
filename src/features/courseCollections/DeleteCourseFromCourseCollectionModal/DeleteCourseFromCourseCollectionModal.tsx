import { Box, Flex, ThemeIcon } from "@mantine/core";
import React from "react";
import { AlertTriangle } from "react-feather";
import { useMediaQuery } from "@mantine/hooks";
import { Button, Paragraph } from "@shared/ui";
import { useAdminDeleteCourseFromCourseCollection } from "@entities/courseCollection";
import useStyles from "./DeleteCourseFromCourseCollectionModal.styles";

export interface DeleteCourseFromCourseCollectionModalProps {
    id: number;
    name?: string;
    courseCollectionId: string;
    onClose: () => void;
}

const DeleteCourseFromCourseCollectionModal = ({ id, name, courseCollectionId, onClose }: DeleteCourseFromCourseCollectionModalProps) => {
    const { classes } = useStyles();
    const isMobile = useMediaQuery("(max-width: 576px)");

    const deleteCourseFromCourseCollection = useAdminDeleteCourseFromCourseCollection({ courseCollectionId, ids: [id] });

    const handleSubmit = () => {
        deleteCourseFromCourseCollection.mutate(null, {
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
                        {`Вы действительно хотите удалить курс из подборки, `}
                    </Paragraph>
                    <Paragraph variant="small-semi" component="span">{`«${id}: ${name}»?`}</Paragraph>
                </Box>
            </Flex>
            <Flex gap={8}>
                <Button
                    size={isMobile ? "medium" : "large"}
                    variant="border"
                    onClick={onClose}
                    loading={deleteCourseFromCourseCollection.isLoading}
                    w="100%">
                    Отмена
                </Button>
                <Button
                    size={isMobile ? "medium" : "large"}
                    variant="secondary"
                    onClick={handleSubmit}
                    loading={deleteCourseFromCourseCollection.isLoading}
                    w="100%">
                    Удалить
                </Button>
            </Flex>
        </Flex>
    );
};

export default DeleteCourseFromCourseCollectionModal;
