import { Flex, Text, ThemeIcon } from "@mantine/core";
import { PlusCircle as PlusCircleIcon, Edit3 as EditIcon, HelpCircle as HelpCircleIcon } from "react-feather";
import React from "react";
import { Button, Heading, Loader, Paragraph } from "@shared/ui";
import { useUserRole } from "@entities/auth";
import { useAdminLessonTest } from "@entities/lesson";
import MarkCheckCircleIcon from "public/icons/mark-check-circle.svg";
import { getAnswerLetterFromRussianAlphabet, getPluralString } from "@shared/utils";
import { Roles } from "@shared/types";
import useStyles from "./Test.styles";

export interface TestProps {
    lessonId: string;
    onUpdate: () => void;
}

const Test = ({ lessonId, onUpdate }: TestProps) => {
    const { data: test, isFetching, isError } = useAdminLessonTest(lessonId);

    const { classes } = useStyles();

    const userRole = useUserRole();

    if (isFetching) {
        return <Loader />;
    }

    if (isError) {
        return <Text>Произошла ошибка, попробуйте позднее</Text>;
    }

    const renderTopCard = () => {
        if (!test) {
            return (
                <Flex className={classes.topCard} gap={18} align="center" justify="space-between">
                    <Flex gap={8} direction="column">
                        <Heading order={3}>Тест</Heading>
                        <Paragraph variant="text-small-m" color="neutralGray300">
                            Нет добавленных вопросов.
                        </Paragraph>
                    </Flex>

                    {userRole?.name !== Roles.teacher && (
                        <Button className={classes.button} variant="white" size="small" leftIcon={<PlusCircleIcon />} onClick={onUpdate}>
                            Добавить тест
                        </Button>
                    )}
                </Flex>
            );
        }
        return (
            <Flex className={classes.topCard}>
                <Flex className={classes.topCardContent}>
                    <Flex className={classes.count}>
                        <Flex className={classes.checkIconWrapper} align="center" justify="center">
                            <ThemeIcon w={48} h={48} color="secondary">
                                <MarkCheckCircleIcon />
                            </ThemeIcon>
                        </Flex>
                        <Flex gap={2} direction="column">
                            <Heading order={4}>
                                {test.correctAnswersCount}{" "}
                                {getPluralString(test.correctAnswersCount, "верный ответ", "верных ответа", "верных ответов")}
                            </Heading>
                            <Paragraph variant="text-caption">Для успешного прохождения тестирования</Paragraph>
                        </Flex>
                    </Flex>
                    <Flex className={classes.count}>
                        <Flex className={classes.helpIconWrapper} align="center" justify="center">
                            <ThemeIcon w={48} h={48} color="secondary">
                                <HelpCircleIcon />
                            </ThemeIcon>
                        </Flex>
                        <Flex gap={2} direction="column">
                            <Heading order={4}>
                                {test.tasks.length} {getPluralString(test.tasks.length, "вопрос", "вопроса", "вопросов")}
                            </Heading>
                            <Paragraph variant="text-caption">Всего</Paragraph>
                        </Flex>
                    </Flex>
                </Flex>

                {userRole?.name !== Roles.teacher && (
                    <Button className={classes.button} variant="white" size="small" leftIcon={<EditIcon />} onClick={onUpdate}>
                        Редактировать
                    </Button>
                )}
            </Flex>
        );
    };

    return (
        <Flex direction="column" gap={32} w="100%">
            <Heading order={2}>Проверочный тест</Heading>
            {renderTopCard()}
            {test && test.tasks.length > 0 && (
                <Flex gap={16} direction="column">
                    {test.tasks.map((task, taskIndex) => (
                        <Flex className={classes.card} gap={24} direction="column" key={task.id}>
                            <Flex gap={4} direction="column">
                                <Paragraph variant="small-m" color="neutralGray300">
                                    {taskIndex + 1} вопрос
                                </Paragraph>
                                <Heading order={3}>{task.content}</Heading>
                            </Flex>
                            <Flex gap={8} direction="column">
                                {task.answers.map((answer, answerIndex) => (
                                    <Flex className={classes.taskCard} gap={8} align="center" key={answer.id}>
                                        <Flex className={classes.letter} justify="center" align="center">
                                            {getAnswerLetterFromRussianAlphabet(answerIndex + 1)}
                                        </Flex>
                                        <Paragraph variant="text-small-m">{answer.content}</Paragraph>
                                    </Flex>
                                ))}
                            </Flex>
                        </Flex>
                    ))}
                </Flex>
            )}
        </Flex>
    );
};

export default Test;
