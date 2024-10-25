import { Flex, FlexProps } from "@mantine/core";
import { memo } from "react";
import { TestPassTaskAnswer } from "@entities/lesson";
import { Heading, Paragraph } from "@shared/ui";
import useStyles from "./TaskAnswer.styles";
import { PossibleAnswer } from "../PossibleAnswer";

export interface TaskAnswerProps extends Omit<FlexProps, "children"> {
    data: TestPassTaskAnswer;
    numberTaskAnswer: number;
}

const MemoizedTaskAnswer = memo(function TaskAnswer({ data, numberTaskAnswer, ...props }: TaskAnswerProps) {
    const { classes } = useStyles();

    const renderPossibleAnswers = () =>
        data.answer.map((possibleAnswer) => <PossibleAnswer key={possibleAnswer.id} data={possibleAnswer} />);

    return (
        <Flex {...props} className={classes.root}>
            <Flex direction="column" gap={4}>
                <Paragraph variant="small-m" color="neutralMain50">{`${numberTaskAnswer} вопрос`}</Paragraph>
                <Heading order={3}>{data.question}</Heading>
            </Flex>
            <Flex direction="column" gap={8}>
                {renderPossibleAnswers()}
            </Flex>
        </Flex>
    );
});

export default MemoizedTaskAnswer;
