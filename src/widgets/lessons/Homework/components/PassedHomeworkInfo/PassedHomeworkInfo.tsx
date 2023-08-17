import { ActionIcon, Flex, FlexProps } from "@mantine/core";
import { useState } from "react";
import { Edit3 } from "react-feather";
import { Heading } from "@shared/ui";
import { UpdateLessonHomeworkAnswerForm } from "@features/lessons";
import { GetHomeworkResponse } from "@entities/lesson";
import { AnswerStatus } from "./constants";
import { StudentAnswerDetails } from "./components";
import useStyles from "./PassedHomeworkInfo.styles";

export interface PassedHomeworkInfoProps extends Omit<FlexProps, "children"> {
    data?: GetHomeworkResponse;
    lessonId: string;
    courseId: string;
}

const PassedHomeworkInfo = ({ data, lessonId, courseId, ...props }: PassedHomeworkInfoProps) => {
    const [openedHomeworkAnswerForm, setOpenedHomeworkAnswerForm] = useState(false);
    const { classes, cx } = useStyles();

    const handleOpenUpdateLessonHomeworkAnswerForm = () => setOpenedHomeworkAnswerForm(true);
    const handleCloseUpdateLessonHomeworkAnswerForm = () => setOpenedHomeworkAnswerForm(false);

    if (!data?.answers.length || data.answers[0]?.status.name === "needsEdit") {
        return null;
    }

    const renderContent = () => {
        if (openedHomeworkAnswerForm) {
            return (
                <UpdateLessonHomeworkAnswerForm
                    data={data}
                    lessonId={lessonId}
                    courseId={courseId}
                    onClose={handleCloseUpdateLessonHomeworkAnswerForm}
                    isEditableAnswer
                />
            );
        }

        return (
            <StudentAnswerDetails data={data.answers[0]} openUpdateLessonHomeworkAnswerForm={handleOpenUpdateLessonHomeworkAnswerForm} />
        );
    };

    return (
        <Flex {...props} className={cx(classes.root, props.className)}>
            <Flex align="center" justify="space-between">
                <Heading order={3}>{AnswerStatus[data.answers[0].status.name as keyof typeof AnswerStatus]}</Heading>
                <ActionIcon className={classes.editActionIcon} onClick={handleOpenUpdateLessonHomeworkAnswerForm}>
                    <Edit3 size={18} />
                </ActionIcon>
            </Flex>

            {renderContent()}
        </Flex>
    );
};

export default PassedHomeworkInfo;
