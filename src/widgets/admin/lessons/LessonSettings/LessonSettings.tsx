import { Flex, Box } from "@mantine/core";
import React from "react";
import { useRouter } from "next/router";
import { closeModal, openModal } from "@mantine/modals";
import { Trash as TrashIcon } from "react-feather";
import { Button, Heading, Paragraph, TextEditor, VideoInput } from "@shared/ui";
import { AdminLesson } from "@entities/lesson";
import { DeleteLessonModal } from "@features/lessons";
import FalsyIcon from "public/icons/falsy.svg";
import PositivelyIcon from "public/icons/positively.svg";
import useStyles from "./LessonSettings.styles";

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

    const renderLabelValue = (isTrue: boolean) => {
        if (isTrue) {
            return (
                <>
                    <Paragraph variant="small-m">Да</Paragraph>
                    <PositivelyIcon className={classes.icon} />
                </>
            );
        }
        return (
            <>
                <Paragraph variant="small-m">Нет</Paragraph>
                <FalsyIcon className={classes.icon} />
            </>
        );
    };

    return (
        <Flex direction="column" gap={32} w="100%">
            <Flex gap={48} align="center">
                <Heading order={2}>Данные урока</Heading>
                <Button onClick={handleOpenDeleteLessonModal} variant="text" leftIcon={<TrashIcon />}>
                    Удалить урок
                </Button>
            </Flex>
            <Flex gap={16} direction="column">
                <Box className={classes.card}>
                    <Flex gap={16} align="center" justify="space-between">
                        <Flex gap={2} direction="column">
                            {moduleName && <Paragraph variant="text-small-m">{moduleName}</Paragraph>}
                            <Heading order={3}>{data.name}</Heading>
                        </Flex>
                    </Flex>
                    <Paragraph variant="small-m" color="neutral_gray" className={classes.lessonDescription}>
                        {data.description}
                    </Paragraph>
                    <Flex gap={24}>
                        <Flex gap={6}>
                            <Paragraph variant="small-semi">Проверочный тест:</Paragraph>
                            {renderLabelValue(data.hasTest)}
                        </Flex>
                        <Flex gap={6}>
                            <Paragraph variant="small-semi">Домашнее задание:</Paragraph>
                            {renderLabelValue(data.hasHomework)}
                        </Flex>
                    </Flex>
                </Box>

                <VideoInput loadedFilesData={data.videos} />

                <Box className={classes.card}>
                    {!data.content && (
                        <Heading color="neutral_gray" order={3}>
                            Содержание урока
                        </Heading>
                    )}
                    {data.content && (
                        <>
                            <Heading order={3}>Содержание урока</Heading>
                            <TextEditor value={data.content} mt={24} h={560} readonly />
                        </>
                    )}
                </Box>
            </Flex>
        </Flex>
    );
};

export default LessonSettings;
