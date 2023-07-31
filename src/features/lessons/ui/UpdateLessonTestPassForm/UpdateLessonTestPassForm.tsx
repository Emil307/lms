import { ActionIcon, Box, BoxProps, Flex, Text } from "@mantine/core";
import React from "react";
import { FieldArray } from "formik";
import { ArrowLeft } from "react-feather";
import { Button, FProgressBar, Loader, ManagedForm } from "@shared/ui";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { createNotification, getPluralString, ToastType } from "@shared/utils";
import { GetTestPassResponse, UpdateTestPassResponse, lessonApi, useTest } from "@entities/lesson";
import { adaptUpdateLessonTestPassRequest, getInitialValues } from "./utils";
import { $UpdateLessonTestPassFormValidation, UpdateLessonTestPassFormValidation } from "./types";
import useStyles from "./UpdateLessonTestPassForm.styles";
import { Task } from "./components";

export interface UpdateLessonTestPassFormProps extends Omit<BoxProps, "children"> {
    data?: GetTestPassResponse;
    lessonId: string;
    courseId: string;
    onClose: () => void;
}

const UpdateLessonTestPassForm = ({ data, lessonId, courseId, onClose, ...props }: UpdateLessonTestPassFormProps) => {
    const { classes } = useStyles();
    const { data: testData, isLoading, isError } = useTest({ lessonId });

    const progressBarLabel = getPluralString(testData?.tasks.length || 0, "вопрос", "вопроса", "вопросов");

    const updateLessonTestPass = (values: UpdateLessonTestPassFormValidation) => {
        return lessonApi.updateTestPass({ ...adaptUpdateLessonTestPassRequest(values), lessonId, courseId });
    };

    const onSuccess = () => {
        createNotification({
            type: ToastType.SUCCESS,
            title: "Прохождение теста",
            message: "Результаты теста успешно сохранены",
        });
        onClose();
    };

    const onError = () => {
        createNotification({
            type: ToastType.WARN,
            title: "Ошибка сохранения результаттов теста",
        });
    };

    if (isLoading) {
        return <Loader />;
    }

    if (isError) {
        return <Text>Произошла ошибка, попробуйте позднее</Text>;
    }

    return (
        <Box {...props}>
            <ManagedForm<UpdateLessonTestPassFormValidation, UpdateTestPassResponse>
                initialValues={getInitialValues(testData, data)}
                validationSchema={$UpdateLessonTestPassFormValidation}
                mutationKey={[MutationKeys.UPDATE_LESSON_TEST_PASS]}
                keysInvalidateQueries={[{ queryKey: [QueryKeys.GET_LESSON_TEST_PASS] }]}
                mutationFunction={updateLessonTestPass}
                onSuccess={onSuccess}
                onError={onError}
                onCancel={onClose}
                hasConfirmModal
                validateOnChange={false}>
                {({ values, onCancel, setFieldValue }) => {
                    const currentTask = values.tasks[values.progressCounter];
                    const isLastQuestion = values.progressCounter + 1 === values.tasks.length;
                    const isSelectedPossibleAnswerInCurrentTask = !!currentTask.answers.find(({ isSelected }) => isSelected);

                    const handleClickArrowLeft = () => {
                        if (values.progressCounter === 0) {
                            return onCancel();
                        }

                        setFieldValue("progressCounter", --values.progressCounter);
                    };

                    const handleClickNextQuestion = () => setFieldValue("progressCounter", ++values.progressCounter);

                    return (
                        <Flex gap={32} direction="column">
                            <FieldArray name="tasks">{() => <Task data={currentTask} />}</FieldArray>

                            <Flex gap={24} w="100%">
                                <ActionIcon className={classes.actionIconBack} onClick={handleClickArrowLeft}>
                                    <ArrowLeft size={24} />
                                </ActionIcon>
                                <FProgressBar
                                    name="progressCounter"
                                    maxValue={testData.tasks.length || 0}
                                    label={progressBarLabel}
                                    wrapperProps={{ className: classes.progressBarWrapper }}
                                />

                                {!isLastQuestion && (
                                    <Button
                                        variant="secondary"
                                        maw={200}
                                        w="100%"
                                        onClick={handleClickNextQuestion}
                                        disabled={!isSelectedPossibleAnswerInCurrentTask}>
                                        Дaлee
                                    </Button>
                                )}
                                {isLastQuestion && (
                                    <Button
                                        variant="secondary"
                                        type="submit"
                                        maw={200}
                                        w="100%"
                                        disabled={!isSelectedPossibleAnswerInCurrentTask}>
                                        Завершить
                                    </Button>
                                )}
                            </Flex>
                        </Flex>
                    );
                }}
            </ManagedForm>
        </Box>
    );
};

export default UpdateLessonTestPassForm;
