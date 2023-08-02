import { Button, ContentByTextEditor, Heading, Paragraph } from "@shared/ui";
import { Avatar, Flex, ThemeIcon, Box, Collapse } from "@mantine/core";
import useStyles from "./HomeworkTask.styles";
import { Folder, ChevronDown as ChevronDownIcon } from "react-feather";
import { AdminHomeworkAnswer } from "@entities/lesson";
import CompletedIcon from "public/icons/completed.svg";
import ReworkIcon from "public/icons/rework.svg";
import AvatarIcon from "@public/icons/avatar.svg";
import dayjs from "dayjs";
import React, { useState } from "react";
import { closeModal, openModal } from "@mantine/modals";
import { UpdateLessonHomeworkStatusAnswerModal } from "@features/lessons";

interface HomeworkTaskProps {
    homeworkAnswer: AdminHomeworkAnswer;
    studentFio: string;
}

const HomeworkTask = ({ homeworkAnswer, studentFio }: HomeworkTaskProps) => {
    const { classes } = useStyles();
    const [isOpenedHomework, setOpenedHomework] = useState(false);

    const handleToggleOpenedHomework = () => setOpenedHomework((prevState) => !prevState);

    const handleCloseUpdateHomeworkAnswerStatusModal = () => closeModal("UPDATE_HOMEWORK_ANSWER_STATUS");

    const openUpdateHomeworkAnswerStatus = () => {
        openModal({
            modalId: "UPDATE_HOMEWORK_ANSWER_STATUS",
            title: "Отправить на доработку",
            children: (
                <UpdateLessonHomeworkStatusAnswerModal
                    homeworkAnswerId={String(homeworkAnswer.id)}
                    onClose={handleCloseUpdateHomeworkAnswerStatusModal}
                />
            ),
        });
    };

    const renderHomeworkToggle = () => {
        return (
            <Button
                variant="text"
                rightIcon={
                    <ThemeIcon color="dark" sx={{ transform: `rotate(${isOpenedHomework ? 180 : 0}deg)` }}>
                        <ChevronDownIcon />
                    </ThemeIcon>
                }
                onClick={handleToggleOpenedHomework}>
                {isOpenedHomework ? "Скрыть задание" : "Показать задание"}
            </Button>
        );
    };

    const renderActionButtons = () => {
        switch (homeworkAnswer.status.name) {
            case "onReview":
                return (
                    <Flex gap={8}>
                        <Button variant="border" leftIcon={<ReworkIcon />} onClick={openUpdateHomeworkAnswerStatus}>
                            На доработку
                        </Button>
                        <Button variant="border" leftIcon={<CompletedIcon />}>
                            Выполнено
                        </Button>
                    </Flex>
                );
            case "needsEdit":
                return (
                    <Flex gap={8}>
                        <Button variant="border" leftIcon={<CompletedIcon />}>
                            Выполнено
                        </Button>
                    </Flex>
                );
            default:
                return null;
        }
    };

    return (
        <Flex gap={32} direction="column">
            <Heading order={2}>Домашнее задание</Heading>
            <Flex gap={16} justify="space-between" align="flex-start">
                <Flex gap={16}>
                    <ThemeIcon className={classes.icon} radius={56} w={48} h={48}>
                        <Folder color="white" />
                    </ThemeIcon>
                    <Flex gap={2} direction="column">
                        <Paragraph variant="text-caption">
                            {homeworkAnswer.module?.name}
                            Основы финансовой грамотности
                        </Paragraph>
                        <Heading order={3}>{homeworkAnswer.homework.lesson.name}</Heading>
                    </Flex>
                </Flex>
                {renderHomeworkToggle()}
            </Flex>

            <Collapse in={isOpenedHomework}>
                <Flex gap={24} direction="column">
                    <ContentByTextEditor data={homeworkAnswer.homework.content} />
                    {/*TODO: выводить FileItems, когда вернут бэки*/}
                    {/*{homeworkAnswer.homework && homework.files.length > 0 && (*/}
                    {/*    <Flex gap={24} direction="column">*/}
                    {/*        {homework.files.map((file) => (*/}
                    {/*            <FileItem type="document" fileName={file.name} fileSize={file.size} key={file.id} />*/}
                    {/*        ))}*/}
                    {/*    </Flex>*/}
                    {/*)}*/}
                </Flex>
            </Collapse>

            {renderActionButtons()}

            <Flex className={classes.answer} gap={24} direction="column">
                <Heading order={4}>Ответ ученика</Heading>
                <Flex className={classes.answerContent} gap={8}>
                    <Avatar
                        // TODO: Когда бэк вернет аватар студента
                        // src={homeworkAnswer.student.profile}
                        src={""}
                        alt="avatar"
                        w={32}
                        h={32}
                        miw={32}
                        radius={56}
                        styles={(theme) => ({
                            placeholder: { backgroundColor: theme.colors.grayLight[0] },
                        })}>
                        <ThemeIcon variant="outline" className={classes.avatarDefaultIconWrapper}>
                            <AvatarIcon />
                        </ThemeIcon>
                    </Avatar>
                    <Box>
                        <Flex gap={6} mb={8}>
                            <Paragraph variant="text-caption" color="neutral_gray">
                                {studentFio}
                            </Paragraph>
                            <Paragraph variant="text-caption" color="neutral_gray">
                                {dayjs(homeworkAnswer.updatedAt).format("DD.MM.YYYY")}
                            </Paragraph>
                        </Flex>
                        <ContentByTextEditor data={homeworkAnswer.answer} />
                        {/*TODO: выводить FileItems, когда вернут бэки*/}
                        {/*{homeworkAnswer.homework && homework.files.length > 0 && (*/}
                        {/*    <Flex gap={24} direction="column">*/}
                        {/*        {homework.files.map((file) => (*/}
                        {/*            <FileItem type="document" fileName={file.name} fileSize={file.size} key={file.id} />*/}
                        {/*        ))}*/}
                        {/*    </Flex>*/}
                        {/*)}*/}
                    </Box>
                </Flex>
            </Flex>
        </Flex>
    );
};

export default HomeworkTask;
