import { Flex, FlexProps } from "@mantine/core";
import { useState } from "react";
import { Heading } from "@shared/ui";
import { UpdateLessonHomeworkAnswerForm } from "@features/lessons";
import { GetHomeworkResponse } from "@entities/lesson";
import { AnswerStatus } from "./constants";
import { StudentAnswerDetails } from "./components";
import useStyles from "./PassedHomeworkInfo.styles";

export interface PassedHomeworkInfoProps extends Omit<FlexProps, "children"> {
    data?: GetHomeworkResponse;
    lessonId: string;
}

const PassedHomeworkInfo = ({ data, lessonId, ...props }: PassedHomeworkInfoProps) => {
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
                    //TODO: для теста. тк groupId будет браться из show lesson ЛК
                    groupId={3}
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
            <Heading order={3}>{AnswerStatus[data.answers[0].status.name as keyof typeof AnswerStatus]}</Heading>
            {renderContent()}
        </Flex>
    );
};

export default PassedHomeworkInfo;
