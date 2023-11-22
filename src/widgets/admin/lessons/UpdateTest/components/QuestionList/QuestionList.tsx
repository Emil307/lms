import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Flex } from "@mantine/core";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { PlusCircle as PlusCircleIcon } from "react-feather";
import { FieldArray, setNestedObjectValues, useFormikContext } from "formik";
import { AdminTestQuestion } from "@entities/lesson";
import { Button } from "@shared/ui";
import useStyles from "./QuestionList.styles";
import { INITIAL_ANSWERS } from "./constants";
import { Question } from "../Question";
import { UpdateTestFormValues } from "../../types";

const QuestionList = () => {
    const { classes } = useStyles();
    const { values, setFieldValue, errors, touched, setTouched, setFieldTouched, validateForm } = useFormikContext<UpdateTestFormValues>();

    const initialLastQuestionId = useMemo(() => {
        if (!values.tasks.length) {
            return 0;
        }
        return [...values.tasks].sort((a, b) => b.id - a.id)[0].id;
    }, []);

    const lastQuestionId = useRef<number>(initialLastQuestionId);
    const [hasChangedOrder, setHasChangedOrder] = useState(false);

    const questionsForSortable = useMemo(() => {
        return values.tasks;
    }, [hasChangedOrder]);

    const renderError = useCallback(
        (questionIndex: number) => {
            const error = errors.tasks?.at(questionIndex);
            if (error && touched.tasks?.at(questionIndex)) {
                return error;
            }
            return null;
        },
        [errors, touched]
    );

    useEffect(() => {
        const validate = async () => {
            const validationErrors = await validateForm();
            if (Object.keys(validationErrors).length > 0) {
                setTouched(setNestedObjectValues(validationErrors, true));
            }
        };
        validate();
    }, [hasChangedOrder]);

    const handleDragEnd = (event: DragEndEvent) => {
        const getNewIndex = (oldIndex: number, direction: string | null) => {
            const { active, over } = event;
            if (over?.id && active.id !== over.id) {
                return values.tasks.findIndex(({ id }) => id === over.id);
            }
            switch (direction) {
                case "up":
                    if (!oldIndex) {
                        return oldIndex;
                    }
                    return oldIndex - 1;
                case "down":
                    if (oldIndex === values.tasks.length - 1) {
                        return oldIndex;
                    }
                    return oldIndex + 1;
                default:
                    return oldIndex;
            }
        };

        const { active, activatorEvent } = event;
        const element = activatorEvent.target as Element;
        const direction = element.getAttribute("data-direction");
        const oldIndex = values.tasks.findIndex(({ id }) => id === active.id);
        const newIndex = getNewIndex(oldIndex, direction);
        const updatedArray = arrayMove(values.tasks, oldIndex, newIndex);
        setFieldValue("tasks", updatedArray);
        setHasChangedOrder((state) => !state);
    };

    const handleAddQuestion = () => {
        const newQuestion: AdminTestQuestion = {
            id: ++lastQuestionId.current,
            order: values.tasks.length,
            content: "",
            answers: INITIAL_ANSWERS,
        };
        setFieldValue("tasks", [...values.tasks, newQuestion]);
    };

    const renderQuestions = () => {
        if (!values.tasks.length) {
            return null;
        }
        return (
            <Flex className={classes.questionsWrapper}>
                <DndContext onDragEnd={handleDragEnd} modifiers={[restrictToVerticalAxis]}>
                    <SortableContext items={questionsForSortable}>
                        <FieldArray
                            name="tasks"
                            render={(props) => (
                                <>
                                    {values.tasks.map((question, index) => (
                                        <Question
                                            name={`tasks.${index}`}
                                            questionName={question.content}
                                            questionId={question.id}
                                            answers={question.answers}
                                            onDeleteQuestion={props.remove}
                                            index={index}
                                            setFieldValue={setFieldValue}
                                            setFieldTouched={setFieldTouched}
                                            error={renderError(index)}
                                            key={question.id}
                                        />
                                    ))}
                                </>
                            )}
                        />
                    </SortableContext>
                </DndContext>
            </Flex>
        );
    };

    return (
        <>
            {renderQuestions()}
            <Button variant="primary" leftIcon={<PlusCircleIcon />} onClick={handleAddQuestion} w="fit-content" m="auto">
                Добавить вопрос
            </Button>
        </>
    );
};

export default QuestionList;
