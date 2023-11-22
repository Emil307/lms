import { Box, Flex, Badge, ThemeIcon } from "@mantine/core";
import React from "react";
import { Check as CheckIcon, Lock as LockIcon, X as XIcon } from "react-feather";
import { Paragraph } from "@shared/ui";
import { AdminGroupLessonForStudentStatistics } from "@entities/group";
import useStyles from "./Lesson.styles";

interface LessonProps {
    data: AdminGroupLessonForStudentStatistics;
    lessonNumber: number;
}

const Lesson = ({ data, lessonNumber }: LessonProps) => {
    const { classes } = useStyles({
        homeworkStatus: data.homeworkStatus?.name,
        testStatus: data.testStatus?.name,
        lessonStatus: data.lessonStatus?.name,
    });

    const renderPassingLessonIcon = () => {
        switch (data.lessonStatus?.name) {
            case "blocked":
                return <LockIcon />;
            case "inProgress":
                return <XIcon />;
            case "completed":
                return <CheckIcon />;
            default:
                return <LockIcon />;
        }
    };

    return (
        <Flex className={classes.lesson}>
            <Box>
                <Paragraph variant="text-caption" color="neutral_gray">
                    {data.name}
                </Paragraph>
                <Paragraph variant="text-small-m">
                    Урок {lessonNumber}: {data.name}
                </Paragraph>
            </Box>
            <Flex className={classes.results}>
                <Flex className={classes.resultsMain}>
                    <Flex className={classes.resultItem}>
                        <Paragraph variant="text-small-m" color="neutral_gray">
                            Тест:
                        </Paragraph>
                        <Paragraph className={classes.testResult} variant="text-small-m">
                            {data.testStatus ? data.testStatus.displayName : "Нет"}
                        </Paragraph>
                    </Flex>
                    <Flex className={classes.resultItem}>
                        <Paragraph variant="text-small-m" color="neutral_gray">
                            Задание:
                        </Paragraph>
                        <Paragraph className={classes.homeworkResult} variant="text-small-m">
                            {data.homeworkStatus ? data.homeworkStatus.displayName : "Нет"}
                        </Paragraph>
                    </Flex>
                </Flex>
                <Badge className={classes.lessonResult}>
                    <ThemeIcon w={16} h={16} className={classes.lessonResultIcon}>
                        {renderPassingLessonIcon()}
                    </ThemeIcon>
                    <Paragraph className={classes.lessonResultText} variant="text-caption">
                        {data.lessonStatus?.displayName}
                    </Paragraph>
                </Badge>
            </Flex>
        </Flex>
    );
};

export default Lesson;
