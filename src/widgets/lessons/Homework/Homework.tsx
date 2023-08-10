import { Badge, Collapse, Divider, Flex, Text } from "@mantine/core";
import { useEffect, useMemo, useState } from "react";
import { ChevronUp } from "react-feather";
import { Button, ContentByTextEditor, FileItem, Heading, Loader } from "@shared/ui";
import { useHomework } from "@entities/lesson";
import { UpdateLessonHomeworkAnswerForm } from "@features/lessons";
import useStyles from "./Homework.styles";
import { PassedHomeworkInfo } from "./components";
import { HomeworkChat } from "../HomeworkChat";

export interface HomeworkProps {
    lessonId: string;
    courseId: string;
}

const Homework = ({ lessonId, courseId }: HomeworkProps) => {
    const [openedHomeworkAnswerForm, setOpenedHomeworkAnswerForm] = useState(false);
    const [openedHomeworkDetails, setOpenedHomeworkDetails] = useState(false);
    const [isVisibleCollapsedView, setVisibleCollapsedView] = useState(false);
    const { data: homeworkData, isLoading, isError } = useHomework({ lessonId, courseId });

    const labelToggleButton = openedHomeworkDetails ? "Скрыть задание" : "Показать задание";

    const { classes } = useStyles({ status: homeworkData?.answers[0]?.status.name, openedHomeworkDetails });

    useEffect(() => {
        if ((homeworkData && !homeworkData.answers.length) || homeworkData?.answers[0].status.name === "needsEdit") {
            setVisibleCollapsedView(false);
            setOpenedHomeworkDetails(true);
            setOpenedHomeworkAnswerForm(true);
            return;
        }

        setVisibleCollapsedView(true);
        setOpenedHomeworkDetails(false);
    }, [homeworkData?.answers]);

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

    if (isLoading) {
        return <Loader />;
    }

    if (isError) {
        return <Text>Произошла ошибка, попробуйте позднее</Text>;
    }

    return (
        <Flex className={classes.root}>
            <Flex align="center" justify="space-between">
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

            <Flex direction="column" gap={48}>
                <Collapse in={openedHomeworkDetails}>
                    <Flex direction="column" gap={24}>
                        <ContentByTextEditor data={homeworkData?.content} />
                        {renderDocuments}
                    </Flex>
                </Collapse>

                <PassedHomeworkInfo data={homeworkData} lessonId={lessonId} courseId={courseId} />

                <UpdateLessonHomeworkAnswerForm
                    data={homeworkData}
                    lessonId={lessonId}
                    courseId={courseId}
                    onClose={handleCloseUpdateLessonHomeworkAnswerForm}
                    hidden={!openedHomeworkAnswerForm}
                />
                <Divider size={1} color="gray20" hidden={!homeworkData?.answers.length} />
                {!!homeworkData?.answers.length && (
                    <HomeworkChat
                        homeworkAnswerId={String(homeworkData.answers[0].id)}
                        courseId={courseId}
                        answerIsCompleted={homeworkData.answers[0]?.status.name === "completed"}
                    />
                )}
            </Flex>
        </Flex>
    );
};

export default Homework;
