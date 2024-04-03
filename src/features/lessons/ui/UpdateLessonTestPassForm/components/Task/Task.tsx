import { Flex, FlexProps } from "@mantine/core";
import { memo } from "react";
import { useFormikContext } from "formik";
import { Heading, Paragraph } from "@shared/ui";
import useStyles from "./Task.styles";
import { TaskTestPass, UpdateLessonTestPassFormValidation } from "../../types";
import { PossibleAnswer } from "../PossibleAnswer";

export interface TaskProps extends Omit<FlexProps, "onClick"> {
    data: TaskTestPass;
    readOnly?: boolean;
}

const MemoizedTask = memo(function Task({ data, readOnly, ...props }: TaskProps) {
    const { classes } = useStyles();

    const { setFieldValue } = useFormikContext<UpdateLessonTestPassFormValidation>();

    const taskVariant = data.isCheckbox ? "checkbox" : "radio";

    const handleSelectPossibleAnswer = (selectedPossibleAnswerOrder: number) => {
        if (data.isCheckbox) {
            return setFieldValue(
                `tasks.${data.order}.answers.${selectedPossibleAnswerOrder}.isSelected`,
                !data.answers[selectedPossibleAnswerOrder].isSelected,
            );
        }

        data.answers.map((possibleAnswer) =>
            setFieldValue(
                `tasks.${data.order}.answers.${possibleAnswer.order}.isSelected`,
                possibleAnswer.order === selectedPossibleAnswerOrder,
            ),
        );
    };

    const renderPossibleAnswers = () =>
        data.answers.map((possibleAnswer) => (
            <PossibleAnswer
                taskVariant={taskVariant}
                key={possibleAnswer.id}
                data={possibleAnswer}
                onSelect={handleSelectPossibleAnswer}
                readOnly={readOnly}
            />
        ));

    return (
        <Flex {...props} className={classes.root}>
            <Flex direction="column" gap={4}>
                <Paragraph variant="small-m" color="gray45">{`${data.order + 1} вопрос`}</Paragraph>
                <Heading order={3}>{data.content}</Heading>
            </Flex>
            <Flex direction="column" gap={8}>
                {renderPossibleAnswers()}
            </Flex>
        </Flex>
    );
});

export default MemoizedTask;
