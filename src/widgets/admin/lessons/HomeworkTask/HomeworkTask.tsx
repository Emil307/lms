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
import { useMedia } from "@shared/utils";
import { Roles } from "@app/routes";
import { useUserRole } from "@entities/auth/hooks";
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

    const userRole = useUserRole();

    const isMobile = useMedia("sm");

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
        if (userRole === Roles.manager) {
            return null;
        }
        switch (homeworkAnswer.status.name) {
            case "onReview":
                return (
                    <Flex gap={8} wrap="wrap">
                        <Button
                            variant="border"
                            size={isMobile ? "small" : "medium"}
                            leftIcon={<ReworkIcon />}
                            onClick={openUpdateHomeworkAnswerStatus}>
                            На доработку
                        </Button>
                        <Button
                            variant="border"
                            size={isMobile ? "small" : "medium"}
                            leftIcon={<CompletedIcon />}
                            onClick={() => updateAnswerStatus(null)}>
                            Выполнено
                        </Button>
                    </Flex>
                );
            default:
                return null;
        }
    };

    return (
        <Flex className={classes.root}>
            <Loader isLoading={isLoading} overlay />
            <Flex className={classes.headingContainer}>
                <Heading order={2}>Домашнее задание</Heading>
                {homeworkAnswer.status.name === "completed" && (
                    <Box className={classes.status}>
                        <Paragraph variant="text-small-m">Выполнено</Paragraph>
                    </Box>
                )}
            </Flex>

            <Flex className={classes.headingHomeworkContainer}>
                <Flex align={homeworkAnswer.module?.name ? "start" : "center"} className={classes.headingHomeworkTextContainer}>
                    <ThemeIcon className={classes.icon}>
                        <FolderIcon />
                    </ThemeIcon>
                    <Flex direction="column" gap={2}>
                        <Paragraph variant="text-caption">{homeworkAnswer.module?.name}</Paragraph>
                        <Heading order={3}>{homeworkAnswer.homework.lesson.name}</Heading>
                    </Flex>
                </Flex>
                {renderHomeworkToggle()}
            </Flex>

            <Collapse in={isOpenedHomework}>
                <Flex direction="column" gap={24}>
                    <ContentByTextEditor data={homeworkAnswer.homework.content} />
                    {homeworkAnswer.homework.files.length > 0 && (
                        <Flex direction="column" gap={16}>
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

            {renderActionButtons()}

            <Flex className={classes.answerContainer}>
                <Heading order={4}>Ответ ученика</Heading>
                <Flex className={classes.answerContent}>
                    <Avatar src={homeworkAnswer.student.profile.avatar?.absolutePath} alt="avatar" className={classes.avatarWrapper}>
                        <ThemeIcon className={classes.avatarDefaultIconWrapper}>
                            <AvatarIcon />
                        </ThemeIcon>
                    </Avatar>
                    <Box className={classes.answerStudentContainer}>
                        <Flex className={classes.answerStudentInfo}>
                            <Paragraph variant="text-caption" color="gray45">
                                {studentFio}
                            </Paragraph>
                            <Paragraph variant="text-caption" color="gray45" sx={{ whiteSpace: "nowrap" }}>
                                {getFormatUpdatedAt(homeworkAnswer.updatedAt)}
                            </Paragraph>
                        </Flex>
                        <Flex direction="column" gap={24}>
                            <ContentByTextEditor data={homeworkAnswer.answer} />
                            {homeworkAnswer.files.length > 0 && (
                                <Flex direction="column" gap={16}>
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
