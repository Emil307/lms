import { Flex } from "@mantine/core";
import { Checkbox, Paragraph, Radio } from "@shared/ui";
import { getAnswerLetterFromRussianAlphabet } from "@shared/utils";
import useStyles from "./PossibleAnswer.styles";
import { TaskPossibleAnswer } from "../../types";

export interface PossibleAnswerProps {
    data: TaskPossibleAnswer;
    taskVariant: "checkbox" | "radio";
    onSelect: (possibleAnswerOrder: number) => void;
}

const PossibleAnswer = ({ data, taskVariant, onSelect }: PossibleAnswerProps) => {
    const { classes } = useStyles({ isPrevSelected: data.isPrevSelected });

    const handleSelectPossbleAnswer = () => onSelect(data.order);

    const renderSelector = () => {
        if (taskVariant === "checkbox") {
            return <Checkbox checked={data.isSelected} onChange={handleSelectPossbleAnswer} />;
        }

        return <Radio checked={data.isSelected} onChange={handleSelectPossbleAnswer} />;
    };

    return (
        <Flex className={classes.root}>
            <Flex className={classes.answerLetterWrapper}>{getAnswerLetterFromRussianAlphabet(data.order + 1)}</Flex>
            <Flex align="center" gap={8}>
                {renderSelector()}
                <Paragraph variant="text-small-m">{data.content}</Paragraph>
            </Flex>
        </Flex>
    );
};

export default PossibleAnswer;
