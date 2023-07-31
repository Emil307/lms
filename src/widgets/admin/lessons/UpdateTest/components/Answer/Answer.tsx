import { ActionIcon, Flex, useMantineTheme } from "@mantine/core";
import React, { memo } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { X as CloseIcon } from "react-feather";
import { FastField, FormikHelpers } from "formik";
import { FastFieldProps } from "formik/dist/FastField";
import MarkCheckCircleBoldIcon from "@public/icons/mark-check-circle-bold.svg";
import { FInput } from "@shared/ui";
import IconDragDots from "@public/icons/dragDots.svg";
import { getAnswerLetterFromRussianAlphabet } from "@shared/utils";
import { TestAnswer } from "./types";
import useStyles from "../../UpdateTest.styles";
import { UpdateTestFormValues } from "../../types";

interface AnswerProps {
    name: string;
    answer: TestAnswer;
    index: number;
    setFieldValue: FormikHelpers<UpdateTestFormValues>["setFieldValue"];
    onDelete: (index: number) => void;
}

const Answer = ({ name, answer, index, onDelete, setFieldValue }: AnswerProps) => {
    const theme = useMantineTheme();
    const { classes, cx } = useStyles({ greenCheckIcon: answer.isCorrect });

    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: answer.id });

    const style = {
        transform: CSS.Translate.toString(transform),
        transition,
    };

    const handleDelete = () => onDelete(index);

    const handleChangeCorrectness = () => {
        setFieldValue(name, { ...answer, isCorrect: !answer.isCorrect });
    };

    return (
        <Flex ref={setNodeRef} gap={16} align="center" className={classes.questionCard} style={style}>
            <Flex gap={8} align="center">
                <ActionIcon className={cx(classes.actionIcon, classes.dragIcon)} {...attributes} {...listeners}>
                    <IconDragDots />
                </ActionIcon>
                <Flex className={classes.letter} justify="center" align="center">
                    {getAnswerLetterFromRussianAlphabet(index)}
                </Flex>
                <ActionIcon className={classes.checkIconWrapper} onClick={handleChangeCorrectness} w={40} h={40}>
                    <MarkCheckCircleBoldIcon />
                </ActionIcon>
            </Flex>
            <FastField name={`${name}.content`}>
                {(props: FastFieldProps<string>) => <FInput {...props.field} label="Ответ" w="100%" />}
            </FastField>
            <ActionIcon className={classes.actionIcon}>
                <CloseIcon color={theme.colors.dark[0]} onClick={handleDelete} />
            </ActionIcon>
        </Flex>
    );
};

export default memo(Answer);
