import { Box, Flex, ThemeIcon } from "@mantine/core";
import React from "react";
import { AlertTriangle } from "react-feather";
import { ControlButtons, Paragraph } from "@shared/ui";
import { useDetachMaterialsFromLesson } from "@entities/lesson";
import useStyles from "./DeleteMaterialFromLessonModal.styles";

interface DeleteMaterialFromLessonModalProps {
    lessonId: string;
    lessonName: string;
    materialId: string;
    materialName: string;
    onClose: () => void;
}

const DeleteMaterialFromLessonModal = ({ lessonId, lessonName, materialId, materialName, onClose }: DeleteMaterialFromLessonModalProps) => {
    const { classes } = useStyles();
    const { mutate: detachMaterialFromLesson, isLoading } = useDetachMaterialsFromLesson({ lessonId });
    const handleSubmit = () => {
        detachMaterialFromLesson([materialId], {
            onSuccess: () => {
                onClose();
            },
        });
    };

    return (
        <Flex direction="column" gap={56}>
            <Flex gap={16}>
                <ThemeIcon color="secondary" className={classes.warning}>
                    <AlertTriangle />
                </ThemeIcon>
                <Box>
                    <Paragraph variant="small-m" component="span">
                        Вы действительно хотите удалить материал,
                    </Paragraph>
                    <Paragraph variant="small-semi" component="span">
                        {` «${materialName}» `}
                    </Paragraph>
                    <Paragraph variant="small-m" component="span">
                        из урока
                    </Paragraph>
                    <Paragraph variant="small-semi" component="span">
                        {` «${lessonName}»?`}
                    </Paragraph>
                </Box>
            </Flex>
            <ControlButtons
                variant="modal"
                cancelButtonText="Отмена"
                submitButtonText="Удалить"
                onSubmit={handleSubmit}
                onClose={onClose}
                isLoading={isLoading}
            />
        </Flex>
    );
};

export default DeleteMaterialFromLessonModal;
