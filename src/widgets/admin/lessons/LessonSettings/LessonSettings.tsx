import { Flex, Box } from "@mantine/core";
import React from "react";
import { ContentByTextEditor, Heading, Paragraph, TextEditor, VideoInput } from "@shared/ui";
import { AdminLesson } from "@entities/lesson";
import FalsyIcon from "public/icons/falsy.svg";
import PositivelyIcon from "public/icons/positively.svg";
import useStyles from "./LessonSettings.styles";
import { DeleteLessonButton } from "./components";
import { useMedia } from "@shared/utils";

interface LessonSettingsProps {
    data: AdminLesson;
    moduleName?: string;
}

const LessonSettings = ({ data, moduleName }: LessonSettingsProps) => {
    const { classes } = useStyles();

    const isMobile = useMedia("sm");

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

    const renderLessonContent = () => {
        if (isMobile && data.content) {
            return <ContentByTextEditor data={data.content} />;
        }

        if (!data.content) {
            return (
                <Heading color="neutral_gray" order={3}>
                    Содержание урока
                </Heading>
            );
        }

        if (data.content) {
            return (
                <>
                    <Heading order={3}>Содержание урока</Heading>
                    {isMobile}
                    <TextEditor value={data.content} mt={24} h={560} readonly />
                </>
            );
        }
        return null;
    };

    return (
        <Flex direction="column" gap={32} w="100%">
            <Flex className={classes.heading}>
                <Heading order={2}>Данные урока</Heading>
                <DeleteLessonButton lessonId={String(data.id)} lessonName={data.name} />
            </Flex>
            <Flex className={classes.wrapper}>
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
                    <Flex className={classes.testAndHomeworkWrapper}>
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

                <Box className={classes.card}>{renderLessonContent()}</Box>
            </Flex>
        </Flex>
    );
};

export default LessonSettings;
