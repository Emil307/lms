import { Box, Flex, Text, useMantineTheme } from "@mantine/core";
import React from "react";
import { AlertTriangle } from "react-feather";
import { Button } from "@shared/ui";
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
    const theme = useMantineTheme();
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
                <Flex align="center" justify="center" className={classes.warning}>
                    <AlertTriangle color={theme.colors.secondary[0]} />
                </Flex>
                <Box className={classes.textWrapper}>
                    <Text>
                        Вы действительно хотите удалить материал,
                        <Text className={classes.textData}>{` «${materialName}» `}</Text>
                        <Text className={classes.inline}>из урока</Text>
                        <Text className={classes.textData}>{` «${lessonName}»?`}</Text>
                    </Text>
                </Box>
            </Flex>
            <Flex gap={8}>
                <Button size="large" variant="border" onClick={onClose} disabled={isLoading} w="50%">
                    Отмена
                </Button>
                <Button size="large" variant="secondary" onClick={handleSubmit} loading={isLoading} w="50%">
                    Удалить
                </Button>
            </Flex>
        </Flex>
    );
};

export default DeleteMaterialFromLessonModal;
