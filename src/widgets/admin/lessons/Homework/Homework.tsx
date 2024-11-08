import { Flex, Text, ThemeIcon, Title } from "@mantine/core";
import React from "react";
import {
    AlertCircle as AlertCircleIcon,
    AlertTriangle as AlertTriangleIcon,
    Edit3 as EditIcon,
    PlusCircle as PlusCircleIcon,
} from "react-feather";
import { Button, ContentByTextEditor, FileItem, Heading, Loader, Paragraph } from "@shared/ui";
import { useAdminLessonHomework } from "@entities/lesson";
import { useUserRole } from "@entities/auth";
import { Roles } from "@shared/types";
import useStyles from "./Homework.styles";

interface HomeworkProps {
    lessonId: string;
    onUpdate: () => void;
}

const Homework = ({ lessonId, onUpdate }: HomeworkProps) => {
    const { data: homework, isFetching, isError } = useAdminLessonHomework(lessonId);

    const { classes } = useStyles();

    const userRole = useUserRole();

    if (isFetching) {
        return <Loader />;
    }

    if (isError) {
        return <Text>Произошла ошибка, попробуйте позднее</Text>;
    }

    const renderTopCard = () => {
        if (!homework) {
            return (
                <Flex className={classes.topCard}>
                    <Flex gap={8} direction="column">
                        <Title order={3}>Задание</Title>
                        <Paragraph variant="text-small-m" color="neutralGray300">
                            Без проверки домашнего задания доступ к следующему уроку будет закрыт
                        </Paragraph>
                    </Flex>

                    {userRole?.name !== Roles.teacher && (
                        <Button className={classes.button} variant="white" size="small" leftIcon={<PlusCircleIcon />} onClick={onUpdate}>
                            Добавить задание
                        </Button>
                    )}
                </Flex>
            );
        }
        if (homework.requiredType === "required") {
            return (
                <Flex className={classes.topCard}>
                    <Flex gap={16} align="center">
                        <Flex className={classes.alertIconWrapper} align="center" justify="center">
                            <ThemeIcon w={48} h={48} color="secondary">
                                <AlertCircleIcon />
                            </ThemeIcon>
                        </Flex>
                        <Flex gap={2} direction="column">
                            <Heading order={4}>Обязательная проверка</Heading>
                            <Paragraph variant="text-caption">
                                Без выполнения домашнего задания доступ к следующему уроку будет недоступен
                            </Paragraph>
                        </Flex>
                    </Flex>

                    {userRole?.name !== Roles.teacher && (
                        <Button className={classes.button} variant="white" size="small" leftIcon={<EditIcon />} onClick={onUpdate}>
                            Редактировать
                        </Button>
                    )}
                </Flex>
            );
        }
        return (
            <Flex className={classes.topCard}>
                <Flex gap={16} align="center">
                    <Flex className={classes.warningIconWrapper} align="center" justify="center">
                        <ThemeIcon w={48} h={48} color="warning">
                            <AlertTriangleIcon />
                        </ThemeIcon>
                    </Flex>
                    <Flex gap={2} direction="column">
                        <Heading order={4}>Без проверки</Heading>
                        <Paragraph variant="text-caption">Доступ к следующему уроку будет открыт автоматически</Paragraph>
                    </Flex>
                </Flex>
                <Button className={classes.button} variant="white" size="small" leftIcon={<EditIcon />} onClick={onUpdate}>
                    Редактировать
                </Button>
            </Flex>
        );
    };

    return (
        <Flex gap={32} direction="column" w="100%" maw={1162}>
            <Title order={2}>Домашнее задание</Title>
            {renderTopCard()}
            <Flex gap={24} direction="column">
                <ContentByTextEditor data={homework?.content} />
                {homework?.files && homework.files.length > 0 && (
                    <Flex gap={24} direction="column">
                        {homework.files.map((file) => (
                            <FileItem type="document" fileName={file.name} fileSize={file.size} fileUrl={file.absolutePath} key={file.id} />
                        ))}
                    </Flex>
                )}
            </Flex>
        </Flex>
    );
};

export default Homework;
