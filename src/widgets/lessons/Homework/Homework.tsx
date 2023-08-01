import { Badge, Collapse, Flex, Text } from "@mantine/core";
import { useEffect, useMemo, useState } from "react";
import { ChevronUp } from "react-feather";
import { Button, ContentByTextEditor, FileItem, Heading, Loader } from "@shared/ui";
import { useHomework } from "@entities/lesson";
import { UpdateLessonHomeworkAnswerForm } from "@features/lessons";
import useStyles from "./Homework.styles";
import { PassedHomeworkInfo } from "./components";

export interface HomeworkProps {
    lessonId: string;
}

const Homework = ({ lessonId }: HomeworkProps) => {
    const [openedHomeworkAnswerForm, setOpenedHomeworkAnswerForm] = useState(false);
    const [openedHomeworkDetails, setOpenedHomeworkDetails] = useState(false);
    const [isVisibleCollapsedView, setVisibleCollapsedView] = useState(false);
    const { data: homeworkData, isLoading, isError } = useHomework({ lessonId });

    const labelToggleButton = openedHomeworkDetails ? "Скрыть задание" : "Показать задание";

    const { classes } = useStyles({ status: homeworkData?.answers[0]?.status.name, openedHomeworkDetails });

    useEffect(() => {
        if ((homeworkData && !homeworkData.answers.length) || homeworkData?.answers[0].status.name === "needs_edit") {
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

                <PassedHomeworkInfo data={homeworkData} lessonId={lessonId} />

                <UpdateLessonHomeworkAnswerForm
                    data={homeworkData}
                    lessonId={lessonId}
                    //TODO: для теста. тк groupId будет браться из show lesson ЛК
                    groupId={3}
                    onClose={handleCloseUpdateLessonHomeworkAnswerForm}
                    hidden={!openedHomeworkAnswerForm}
                />
            </Flex>
        </Flex>
    );
};

export default Homework;
