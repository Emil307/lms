import { Flex, Box, Text, ThemeIcon, Title } from "@mantine/core";
import React from "react";
import { useRouter } from "next/router";
import { closeModal, openModal } from "@mantine/modals";
import { Trash as TrashIcon } from "react-feather";
import { Button, TextEditor } from "@shared/ui";
import { AdminLesson } from "@entities/lesson";
import { DeleteLessonModal } from "@features/lessons";
import useStyles from "./LessonSettings.styles";
import { getPluralString } from "@shared/utils";
import FalsyIcon from "public/icons/falsy.svg";
import PositivelyIcon from "public/icons/positively.svg";

interface LessonSettingsProps {
    data: AdminLesson;
    moduleName?: string;
}

const LessonSettings = ({ data, moduleName }: LessonSettingsProps) => {
    const router = useRouter();
    const { classes } = useStyles();
    const lessonId = String(data.id);

    const closeDeleteLessonModal = () => closeModal("DELETE_LESSON");

    const handleCancelDeleteLesson = () => closeDeleteLessonModal();

    const handleSuccessDeleteLesson = () => {
        closeDeleteLessonModal();
        router.push("/admin/lessons");
    };

    const handleOpenDeleteLessonModal = () => {
        openModal({
            modalId: "DELETE_LESSON",
            title: "Удаление урока",
            centered: true,
            children: (
                <DeleteLessonModal
                    id={lessonId}
                    name={data.name}
                    onSuccess={handleSuccessDeleteLesson}
                    onCancel={handleCancelDeleteLesson}
                />
            ),
        });
    };

    const renderLabelIcon = (isTrue: boolean) => {
        if (isTrue) {
            return (
                <>
                    <Text className={classes.labelValue}>Да</Text>
                    <PositivelyIcon className={classes.icon} />
                </>
            );
        }
        return (
            <>
                <Text className={classes.labelValue}>Нет</Text>
                <FalsyIcon className={classes.icon} />
            </>
        );
    };

    return (
        <Flex direction="column" gap={32} w="100%">
            <Flex gap={48} align="center">
                <Title order={2}>Данные урока</Title>
                <Button
                    onClick={handleOpenDeleteLessonModal}
                    variant="text"
                    leftIcon={
                        <ThemeIcon color="dark" variant="outline" sx={{ border: "none" }}>
                            <TrashIcon />
                        </ThemeIcon>
                    }>
                    Удалить урок
                </Button>
            </Flex>
            <Flex gap={16} direction="column">
                <Box className={classes.card}>
                    {moduleName && <Text className={classes.moduleName}>{moduleName}</Text>}
                    <Title order={3}>{data.name}</Title>
                    <Text className={classes.lessonDescription}>{data.description}</Text>
                    <Flex gap={24}>
                        <Flex className={classes.label} gap={6}>
                            <Text>Проверочный тест:</Text>
                            {renderLabelIcon(data.hasTest)}
                        </Flex>
                        <Flex className={classes.label} gap={6}>
                            <Text>Домашнее задание:</Text>
                            {renderLabelIcon(data.hasHomework)}
                        </Flex>
                    </Flex>
                </Box>

                <Box className={classes.card}>
                    {data.videos.length === 0 && (
                        <>
                            <Title order={3}>Видеоуроки</Title>
                            <Text className={classes.videoEmptyDescription}>Нет загруженных видеоуроков.</Text>
                        </>
                    )}
                    {data.videos.length > 0 && (
                        <Title order={3}>{getPluralString(data.videos.length, "видеоурок", "видеоурока", "видеоуроков")}</Title>
                    )}
                </Box>

                <Box className={classes.card}>
                    {!data.content && (
                        <Title className={classes.emptyContentTitle} order={3}>
                            Содержание урока
                        </Title>
                    )}
                    {data.content && (
                        <>
                            <Title order={3}>Содержание урока</Title>
                            <TextEditor value={data.content} mt={24} mah={560} />
                        </>
                    )}
                </Box>
            </Flex>
        </Flex>
    );
};

export default LessonSettings;
