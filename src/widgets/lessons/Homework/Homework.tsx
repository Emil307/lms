import { Badge, Collapse, Divider, Flex, Text, Box } from "@mantine/core";
import { useEffect, useMemo, useState } from "react";
import { ChevronUp } from "react-feather";
import { Button, ContentByTextEditor, EmptyData, FileItem, Heading, Loader } from "@shared/ui";
import { useHomework } from "@entities/lesson";
import { UpdateLessonHomeworkAnswerForm } from "@features/lessons";
import useStyles from "./Homework.styles";
import { PassedHomeworkInfo } from "./components";
import { HomeworkChat } from "../HomeworkChat";
import IconEmptyBox from "@public/icons/emptyBox.svg";

export interface HomeworkProps {
    lessonId: string;
    courseId: string;
}

const Homework = ({ lessonId, courseId }: HomeworkProps) => {
    const [isReadyToRender, setReadyToRender] = useState(false);
    const [openedHomeworkAnswerForm, setOpenedHomeworkAnswerForm] = useState(false);
    const [openedHomeworkDetails, setOpenedHomeworkDetails] = useState(false);
    const [isVisibleCollapsedView, setVisibleCollapsedView] = useState(false);
    const { data: homeworkData, isLoading, isError } = useHomework({ lessonId, courseId });

    const labelToggleButton = openedHomeworkDetails ? "Скрыть задание" : "Показать задание";
    const answerStatus = homeworkData?.answers[0]?.status.name;

    const { classes } = useStyles({ status: answerStatus, openedHomeworkDetails });

    useEffect(() => {
        if (homeworkData === null) {
            return setReadyToRender(true);
        }
        if (!homeworkData) {
            return;
        }
        if ((homeworkData && !homeworkData.answers.length) || answerStatus !== "onReview") {
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
                            <ContentByTextEditor data={homeworkData?.content} />
                            {renderDocuments}
                        </Flex>
                    </Collapse>
                    <PassedHomeworkInfo data={homeworkData} lessonId={lessonId} courseId={courseId} />
                </Box>

                <UpdateLessonHomeworkAnswerForm
                    data={homeworkData}
                    lessonId={lessonId}
                    courseId={courseId}
                    onClose={handleCloseUpdateLessonHomeworkAnswerForm}
                    hidden={!openedHomeworkAnswerForm}
                />

                <Box my={48}>
                    <Divider
                        size={1}
                        color="gray20"
                        hidden={!homeworkData?.answers.length || homeworkData.answers[0]?.status.name === "completed"}
                    />
                </Box>

                {!!homeworkData?.answers.length && (
                    <HomeworkChat
                        homeworkAnswerId={String(homeworkData.answers[0].id)}
                        courseId={courseId}
                        answerIsCompleted={homeworkData.answers[0]?.status.name === "completed"}
                    />
                )}
            </Box>
        );
    };

    if (isLoading || !isReadyToRender) {
        return <Loader />;
    }

    if (isError) {
        return <Text>Произошла ошибка, попробуйте позднее</Text>;
    }

    return (
        <Flex className={classes.root}>
            <Flex align="center" justify="space-between" gap={32}>
                <Flex gap={16}>
                    <Heading order={2}>Домашнее задание</Heading>
                    {!!homeworkData?.answers.length && (
                        <Badge className={classes.status}>{homeworkData.answers[0].status.displayName}</Badge>
                    )}
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
