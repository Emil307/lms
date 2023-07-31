import { Flex } from "@mantine/core";
import { Checkbox, Paragraph } from "@shared/ui";
import { TestPassAnswer } from "@entities/lesson";
import { getAnswerLetterFromRussianAlphabet } from "@shared/utils";
import useStyles from "./PossibleAnswer.styles";

export interface PossibleAnswerProps {
    data: TestPassAnswer;
}

const PossibleAnswer = ({ data }: PossibleAnswerProps) => {
    const { classes } = useStyles({ isCorrect: data.isCorrect });

    return (
        <Flex className={classes.root}>
            <Flex className={classes.answerLetterWrapper}>{getAnswerLetterFromRussianAlphabet(data.order + 1)}</Flex>
            <Flex align="center" gap={8}>
                <Checkbox checked={data.isSelected} disabled />
                <Paragraph variant="text-small-m">{data.content}</Paragraph>
            </Flex>
        </Flex>
    );
};

export default PossibleAnswer;
