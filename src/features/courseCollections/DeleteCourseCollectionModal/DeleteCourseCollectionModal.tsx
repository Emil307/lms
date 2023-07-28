import { Box, Flex, ThemeIcon } from "@mantine/core";
import React from "react";
import { AlertTriangle } from "react-feather";
import { useMediaQuery } from "@mantine/hooks";
import { Button, Paragraph } from "@shared/ui";
import { useAdminDeleteCourseCollection } from "@entities/courseCollection";
import useStyles from "./DeleteCourseCollectionModal.styles";

export interface DeleteCourseCollectionModalProps {
    id: string;
    name?: string;
    onClose: () => void;
}

const DeleteCourseCollectionModal = ({ id, name, onClose }: DeleteCourseCollectionModalProps) => {
    const { classes } = useStyles();
    const isMobile = useMediaQuery("(max-width: 576px)");

    const deleteCourseCollection = useAdminDeleteCourseCollection({ id });

    const handleSubmit = () => {
        deleteCourseCollection.mutate(null, {
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
                        {`Вы действительно хотите удалить подборку, `}
                    </Paragraph>
                    <Paragraph variant="small-semi" component="span">{`«${id}: ${name}»?`}</Paragraph>
                </Box>
            </Flex>
            <Flex gap={8}>
                <Button
                    size={isMobile ? "medium" : "large"}
                    variant="border"
                    onClick={onClose}
                    loading={deleteCourseCollection.isLoading}
                    w="100%">
                    Отмена
                </Button>
                <Button
                    size={isMobile ? "medium" : "large"}
                    variant="secondary"
                    onClick={handleSubmit}
                    loading={deleteCourseCollection.isLoading}
                    w="100%">
                    Удалить
                </Button>
            </Flex>
        </Flex>
    );
};

export default DeleteCourseCollectionModal;
