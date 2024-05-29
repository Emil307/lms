import { Flex } from "@mantine/core";
import { Checkbox, Paragraph, Radio } from "@shared/ui";
import { getAnswerLetterFromRussianAlphabet } from "@shared/utils";
import useStyles from "./PossibleAnswer.styles";
import { TaskPossibleAnswer } from "../../types";

export interface PossibleAnswerProps {
    data: TaskPossibleAnswer;
    taskVariant: "checkbox" | "radio";
    onSelect: (possibleAnswerOrder: number) => void;
    readOnly?: boolean;
}

const PossibleAnswer = ({ data, taskVariant, onSelect, readOnly }: PossibleAnswerProps) => {
    const { classes } = useStyles({ isSelected: data.isSelected });

    const handleSelectPossibleAnswer = () => onSelect(data.order);

    const renderSelector = () => {
        if (taskVariant === "checkbox") {
            return <Checkbox checked={data.isSelected} onChange={handleSelectPossibleAnswer} disabled={readOnly} />;
        }

        return <Radio checked={data.isSelected} onChange={handleSelectPossibleAnswer} disabled={readOnly} />;
    };

    return (
        <Flex className={classes.root}>
            <Flex className={classes.answerLetterWrapper}>{getAnswerLetterFromRussianAlphabet(data.order + 1)}</Flex>
            <Flex align="center" gap={8}>
                {renderSelector()}
                <Paragraph variant="text-small-m" className={classes.content}>
                    {data.content}
                </Paragraph>
            </Flex>
        </Flex>
    );
};

export default PossibleAnswer;
