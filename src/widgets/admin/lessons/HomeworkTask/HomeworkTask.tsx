import { Avatar, Flex, ThemeIcon, Box, Collapse } from "@mantine/core";
import { ChevronDown as ChevronDownIcon } from "react-feather";
import React, { useState } from "react";
import { closeModal, openModal } from "@mantine/modals";
import { AdminHomeworkAnswer, useUpdateLessonHomeworkAnswerStatus } from "@entities/lesson";
import CompletedIcon from "public/icons/completed.svg";
import ReworkIcon from "public/icons/rework.svg";
import AvatarIcon from "@public/icons/avatar.svg";
import FolderIcon from "public/icons/folder.svg";
import { Button, ContentByTextEditor, FileItem, Heading, Loader, Paragraph } from "@shared/ui";
import { UpdateLessonHomeworkStatusAnswerModal } from "@features/lessons";
import useStyles from "./HomeworkTask.styles";
import { getFormatUpdatedAt } from "./utils";

interface HomeworkTaskProps {
    homeworkAnswer: AdminHomeworkAnswer;
    studentFio: string;
}

const HomeworkTask = ({ homeworkAnswer, studentFio }: HomeworkTaskProps) => {
    const { classes } = useStyles();
    const [isOpenedHomework, setOpenedHomework] = useState(false);
    const { mutate: updateAnswerStatus, isLoading } = useUpdateLessonHomeworkAnswerStatus({
        id: String(homeworkAnswer.id),
        status: "completed",
        content: null,
    });

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
                        <Button variant="border" leftIcon={<CompletedIcon />} onClick={() => updateAnswerStatus(null)}>
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
            <Loader isLoading={isLoading} overlay />
            <Flex gap={16}>
                <Heading order={2}>Домашнее задание</Heading>
                {homeworkAnswer.status.name === "completed" && (
                    <Box className={classes.status}>
                        <Paragraph variant="text-small-m">Выполнено</Paragraph>
                    </Box>
                )}
            </Flex>

            <Box>
                <Flex gap={16} justify="space-between" align="flex-start">
                    <Flex gap={16} align={homeworkAnswer.module?.name ? "start" : "center"}>
                        <ThemeIcon className={classes.icon} radius={56} w={48} h={48}>
                            <FolderIcon />
                        </ThemeIcon>
                        <Flex gap={2} direction="column">
                            <Paragraph variant="text-caption">{homeworkAnswer.module?.name}</Paragraph>
                            <Heading order={3}>{homeworkAnswer.homework.lesson.name}</Heading>
                        </Flex>
                    </Flex>
                    {renderHomeworkToggle()}
                </Flex>

                <Box>
                    <Collapse in={isOpenedHomework}>
                        <Flex gap={24} direction="column" mt={32}>
                            <ContentByTextEditor data={homeworkAnswer.homework.content} />
                            {homeworkAnswer.homework.files.length > 0 && (
                                <Flex gap={24} direction="column">
                                    {homeworkAnswer.homework.files.map((file) => (
                                        <FileItem
                                            type="document"
                                            fileName={file.name}
                                            fileSize={file.size}
                                            fileUrl={file.absolutePath}
                                            key={file.id}
                                        />
                                    ))}
                                </Flex>
                            )}
                        </Flex>
                    </Collapse>
                </Box>
            </Box>

            {renderActionButtons()}

            <Flex className={classes.answer} gap={24} direction="column">
                <Heading order={4}>Ответ ученика</Heading>
                <Flex className={classes.answerContent} gap={8}>
                    <Avatar src={homeworkAnswer.student.profile.avatar?.absolutePath} alt="avatar" className={classes.avatarWrapper}>
                        <ThemeIcon className={classes.avatarDefaultIconWrapper}>
                            <AvatarIcon />
                        </ThemeIcon>
                    </Avatar>
                    <Box>
                        <Flex gap={6} mb={8}>
                            <Paragraph variant="text-caption" color="neutral_gray">
                                {studentFio}
                            </Paragraph>
                            <Paragraph variant="text-caption" color="neutral_gray">
                                {getFormatUpdatedAt(homeworkAnswer.updatedAt)}
                            </Paragraph>
                        </Flex>
                        <Flex gap={24} direction="column">
                            <ContentByTextEditor data={homeworkAnswer.answer} />
                            {homeworkAnswer.files.length > 0 && (
                                <Flex gap={24} direction="column">
                                    {homeworkAnswer.files.map((file) => (
                                        <FileItem
                                            type="document"
                                            fileName={file.name}
                                            fileSize={file.size}
                                            fileUrl={file.absolutePath}
                                            key={file.id}
                                        />
                                    ))}
                                </Flex>
                            )}
                        </Flex>
                    </Box>
                </Flex>
            </Flex>
        </Flex>
    );
};

export default HomeworkTask;
