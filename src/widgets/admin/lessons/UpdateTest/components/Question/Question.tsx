import { Flex, ActionIcon, useMantineTheme, Box } from "@mantine/core";
import { AlertTriangle, PlusCircle as PlusCircleIcon } from "react-feather";
import React, { useRef, useState, memo, useMemo } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext, useSortable } from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { CSS } from "@dnd-kit/utilities";
import { ChevronUp as ChevronUpIcon, ChevronDown as ChevronDownIcon } from "react-feather";
import { FastField, FieldArray, FormikErrors, FormikHelpers } from "formik";
import { FastFieldProps } from "formik/dist/FastField";
import { AdminTestAnswer, AdminTestQuestion } from "@entities/lesson";
import { Button, Heading, FInput, Paragraph } from "@shared/ui";
import { UpdateTestFormValues } from "../../types";
import { Answer } from "../Answer";
import { TestAnswer } from "../Answer/types";
import useStyles from "../../UpdateTest.styles";
import { DeleteQuestionButton } from "../DeleteQuestionButton";

interface QuestionProps {
    name: string;
    questionName: string;
    index: number;
    questionId: number;
    answers: AdminTestAnswer[];
    onDeleteQuestion: (index: number) => void;
    setFieldValue: FormikHelpers<UpdateTestFormValues>["setFieldValue"];
    setFieldTouched: FormikHelpers<UpdateTestFormValues>["setFieldTouched"];
    error?: FormikErrors<AdminTestQuestion> | string | null;
}

const Question = ({
    name,
    questionName,
    index,
    questionId,
    answers,
    setFieldValue,
    setFieldTouched,
    onDeleteQuestion,
    error,
}: QuestionProps) => {
    const theme = useMantineTheme();

    const { classes, cx } = useStyles({ greenCheckIcon: true, hasError: !!error });
    const [hasChangedOrder, setHasChangedOrder] = useState(false);

    const initialLastAnswerId = useMemo(() => {
        if (!answers.length) {
            return 0;
        }
        return [...answers].sort((a, b) => b.id - a.id)[0].id;
    }, []);

    const lastAnswerId = useRef<number>(initialLastAnswerId);

    const answersForSortable = useMemo(() => {
        return answers;
    }, [hasChangedOrder]);

    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: questionId });

    const style = {
        transform: CSS.Translate.toString(transform),
        transition,
    };

    const handleDragEnd = async (event: DragEndEvent) => {
        const { active, over } = event;

        if (active.id !== over?.id) {
            const oldIndex = answers.findIndex(({ id }) => id === active.id);
            const newIndex = answers.findIndex(({ id }) => id === over?.id);
            const updatedArray = arrayMove(answers, oldIndex, newIndex);
            setFieldTouched(`${name}.answers.${newIndex}.content`, true);
            setFieldValue(`${name}.answers`, updatedArray);
            setHasChangedOrder((state) => !state);
        }
    };

    const handleAddAnswer = () => {
        const newAnswer: TestAnswer = {
            id: ++lastAnswerId.current,
            order: answers.length,
            content: "",
            isCorrect: false,
        };
        setFieldValue(`${name}.answers`, [...answers, newAnswer]);
    };

    const renderError = () => {
        if (typeof error !== "string") {
            return null;
        }
        return (
            <Box className={classes.error}>
                <AlertTriangle />
                <Paragraph variant="text-smaller">{error}</Paragraph>
            </Box>
        );
    };

    return (
        <Flex ref={setNodeRef} className={classes.questionCard} style={style}>
            <Flex gap={16} direction="column">
                <Flex gap={32} justify="space-between" align="center">
                    <Heading order={3}>{index + 1} вопрос</Heading>
                    <Flex gap={24} align="center">
                        <DeleteQuestionButton questionName={questionName} index={index} onDeleteQuestion={onDeleteQuestion} />
                        <Flex gap={8}>
                            <ActionIcon
                                className={cx(classes.actionIcon, classes.button)}
                                data-direction="down"
                                {...listeners}
                                {...attributes}>
                                <ChevronDownIcon className={classes.icon} color={theme.colors.dark[0]} />
                            </ActionIcon>
                            <ActionIcon
                                className={cx(classes.actionIcon, classes.button)}
                                data-direction="up"
                                {...listeners}
                                {...attributes}>
                                <ChevronUpIcon className={classes.icon} color={theme.colors.dark[0]} />
                            </ActionIcon>
                        </Flex>
                    </Flex>
                </Flex>
                <FastField name={`${name}.content`}>
                    {(props: FastFieldProps<string>) => <FInput {...props.field} label="Вопрос" w="100%" />}
                </FastField>
            </Flex>
            {answers.length > 0 && (
                <Flex gap={8} direction="column">
                    <DndContext onDragEnd={handleDragEnd} modifiers={[restrictToVerticalAxis]}>
                        <SortableContext items={answersForSortable}>
                            <FieldArray
                                name={`${name}.answers`}
                                render={(props) => (
                                    <>
                                        {answers.map((answer, index) => (
                                            <Answer
                                                answer={answer}
                                                name={`${name}.answers.${index}`}
                                                index={index}
                                                onDelete={props.remove}
                                                setFieldValue={setFieldValue}
                                                key={answer.id}
                                            />
                                        ))}
                                    </>
                                )}
                            />
                        </SortableContext>
                    </DndContext>
                </Flex>
            )}
            {renderError()}
            {answers.length < 5 && (
                <Button variant="white" leftIcon={<PlusCircleIcon />} onClick={handleAddAnswer} w="fit-content" m="auto">
                    Добавить вариант ответа
                </Button>
            )}
        </Flex>
    );
};

function questionPropsAreEqual(prevProps: Readonly<QuestionProps>, nextProps: Readonly<QuestionProps>) {
    return Object.keys(prevProps).every(
        (key) => prevProps[key as keyof Readonly<QuestionProps>] === nextProps[key as keyof Readonly<QuestionProps>]
    );
}

export default memo(Question, questionPropsAreEqual);
