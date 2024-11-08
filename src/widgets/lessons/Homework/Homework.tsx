import { Badge, Collapse, Divider, Flex, Text, Box } from "@mantine/core";
import { useEffect, useMemo, useState } from "react";
import { ChevronUp } from "react-feather";
import { Button, ContentByTextEditor, EmptyData, FileItem, Heading, Loader } from "@shared/ui";
import { GetLessonResponse, useHomework } from "@entities/lesson";
import { UpdateLessonHomeworkAnswerForm } from "@features/lessons";
import IconEmptyBox from "@public/icons/emptyBox.svg";
import { useGroup } from "@entities/group";
import useStyles from "./Homework.styles";
import { PassedHomeworkInfo } from "./components";
import { HomeworkChat } from "../HomeworkChat";

export interface HomeworkProps {
    lesson: GetLessonResponse;
    courseId: string;
    groupId: string;
}

const Homework = ({ lesson, courseId, groupId }: HomeworkProps) => {
    const lessonId = String(lesson.id);
    const { data: groupData } = useGroup({ id: groupId });

    const [isReadyToRender, setReadyToRender] = useState(false);
    const [openedHomeworkAnswerForm, setOpenedHomeworkAnswerForm] = useState(false);
    const [openedHomeworkDetails, setOpenedHomeworkDetails] = useState(false);
    const [isVisibleCollapsedView, setVisibleCollapsedView] = useState(false);
    const { data: homeworkData, isFetching, isError } = useHomework({ lessonId, groupId });

    const labelToggleButton = openedHomeworkDetails ? "Скрыть задание" : "Показать задание";
    const answerStatus = homeworkData?.answer?.status.name;

    const { classes } = useStyles({ status: answerStatus, openedHomeworkDetails });

    useEffect(() => {
        if (homeworkData === null) {
            return setReadyToRender(true);
        }
        if (!homeworkData) {
            return;
        }
        if (!homeworkData.answer || answerStatus !== "onReview") {
            setVisibleCollapsedView(false);
            setOpenedHomeworkDetails(true);

            if (answerStatus === "completed") {
                setOpenedHomeworkAnswerForm(false);
            } else {
                setOpenedHomeworkAnswerForm(true);
            }
            return setReadyToRender(true);
        }

        setVisibleCollapsedView(true);
        setOpenedHomeworkDetails(false);
        setReadyToRender(true);
    }, [homeworkData]);

    const handleToggleVisibilityHomeworkDetails = () => setOpenedHomeworkDetails(!openedHomeworkDetails);

    const handleCloseUpdateLessonHomeworkAnswerForm = () => setOpenedHomeworkAnswerForm(false);

    const renderDocuments = useMemo(() => {
        if (!homeworkData?.files.length) {
            return null;
        }

        return (
            <Flex direction="column" gap={16}>
                {homeworkData.files.map((doc) => (
                    <FileItem key={doc.id} fileUrl={doc.absolutePath} fileName={doc.name} fileSize={doc.size} type="document" />
                ))}
            </Flex>
        );
    }, [homeworkData?.files]);

    const renderContent = () => {
        if (!homeworkData) {
            return <EmptyData title="Задание отсутствует" description="" icon={<IconEmptyBox />} />;
        }
        return (
            <Box>
                <Box>
                    <Collapse in={openedHomeworkDetails}>
                        <Flex direction="column" gap={24} mb={48}>
                            <ContentByTextEditor data={homeworkData.content} />
                            {renderDocuments}
                        </Flex>
                    </Collapse>
                    <PassedHomeworkInfo data={homeworkData} lessonId={lessonId} courseId={courseId} />
                </Box>

                {groupData?.status.name !== "completed" && (
                    <UpdateLessonHomeworkAnswerForm
                        data={homeworkData}
                        lessonId={lessonId}
                        courseId={courseId}
                        onClose={handleCloseUpdateLessonHomeworkAnswerForm}
                        hidden={!openedHomeworkAnswerForm}
                    />
                )}

                <Divider size={1} color="gray20" my={48} hidden={!homeworkData.answer || homeworkData.answer.status.name === "completed"} />

                {groupData?.status.name !== "completed" && homeworkData.answer && (
                    <HomeworkChat
                        homeworkAnswerId={String(homeworkData.answer.id)}
                        courseId={courseId}
                        answerIsCompleted={homeworkData.answer.status.name === "completed"}
                    />
                )}
            </Box>
        );
    };

    if (isFetching || !isReadyToRender) {
        return <Loader />;
    }

    if (isError) {
        return <Text>Произошла ошибка, попробуйте позднее</Text>;
    }

    return (
        <Flex className={classes.root}>
            <Flex className={classes.headingContainer}>
                <Flex className={classes.headingTextContainer}>
                    <Heading order={2}>Домашнее задание</Heading>
                    {homeworkData?.answer && <Badge className={classes.status}>{homeworkData.answer.status.displayName}</Badge>}
                </Flex>
                {isVisibleCollapsedView && (
                    <Button
                        variant="text"
                        onClick={handleToggleVisibilityHomeworkDetails}
                        rightIcon={<ChevronUp />}
                        className={classes.buttonToggle}>
                        {labelToggleButton}
                    </Button>
                )}
            </Flex>
            {renderContent()}
        </Flex>
    );
};

export default Homework;
