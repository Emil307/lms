import { ActionIcon, Box, BoxProps, Flex } from "@mantine/core";
import React from "react";
import { FieldArray } from "formik";
import { ArrowLeft } from "react-feather";
import { Button, FProgressBar, ManagedForm } from "@shared/ui";
import { MutationKeys } from "@shared/constant";
import { createNotification, getPluralString, ToastType } from "@shared/utils";
import { GetTestPassResponse, UpdateTestPassResponse, lessonApi, GetTestResponse } from "@entities/lesson";
import { adaptUpdateLessonTestPassRequest, getInitialValues, getKeysInvalidateQueries } from "./utils";
import { $UpdateLessonTestPassFormValidation, UpdateLessonTestPassFormValidation } from "./types";
import useStyles from "./UpdateLessonTestPassForm.styles";
import { Task } from "./components";
import { useGroup } from "@entities/group";

export interface UpdateLessonTestPassFormProps extends Omit<BoxProps, "children"> {
    testData: GetTestResponse;
    testPassData?: GetTestPassResponse;
    lessonId: string;
    courseId: string;
    groupId: string;
    onClose: () => void;
    readOnly?: boolean;
}

const UpdateLessonTestPassForm = ({
    testPassData,
    testData,
    lessonId,
    courseId,
    groupId,
    readOnly,
    onClose,
    ...props
}: UpdateLessonTestPassFormProps) => {
    const { data: groupData } = useGroup({ id: groupId });
    const { classes } = useStyles();
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

    return (
        <Box {...props}>
            <ManagedForm<UpdateLessonTestPassFormValidation, UpdateTestPassResponse>
                initialValues={getInitialValues(testData, testPassData)}
                validationSchema={$UpdateLessonTestPassFormValidation}
                mutationKey={[MutationKeys.UPDATE_LESSON_TEST_PASS]}
                keysInvalidateQueries={getKeysInvalidateQueries({ lessonId, courseId })}
                mutationFunction={updateLessonTestPass}
                onSuccess={onSuccess}
                onError={onError}
                onCancel={onClose}
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

                    const renderButtons = () => {
                        if (!isLastQuestion) {
                            return (
                                <Button
                                    variant="secondary"
                                    onClick={handleClickNextQuestion}
                                    className={classes.buttonNextOrSubmit}
                                    disabled={!isSelectedPossibleAnswerInCurrentTask && !readOnly}>
                                    Дaлee
                                </Button>
                            );
                        } else if (!readOnly) {
                            <Button
                                variant="secondary"
                                type="submit"
                                className={classes.buttonNextOrSubmit}
                                disabled={!isSelectedPossibleAnswerInCurrentTask}>
                                Завершить
                            </Button>;
                        }
                    };
                    const renderCompletedButtons = () => {
                        if (!isLastQuestion) {
                            return (
                                <Button
                                    variant="secondary"
                                    onClick={handleClickNextQuestion}
                                    className={classes.buttonNextOrSubmit}
                                    disabled={false}>
                                    Дaлee
                                </Button>
                            );
                        } else {
                            return <></>;
                        }
                    };
                    return (
                        <Flex className={classes.innerForm}>
                            <FieldArray name="tasks">
                                {() => <Task data={currentTask} readOnly={readOnly} status={groupData?.status.name} />}
                            </FieldArray>

                            <Box className={classes.footerInnerForm}>
                                <ActionIcon className={classes.actionIconBack} onClick={handleClickArrowLeft}>
                                    <ArrowLeft size={24} />
                                </ActionIcon>
                                <FProgressBar
                                    name="progressCounter"
                                    maxValue={testData?.tasks.length || 0}
                                    label={progressBarLabel}
                                    wrapperProps={{ className: classes.progressBarWrapper }}
                                />
                                {groupData?.status.name === "completed" ? renderCompletedButtons() : renderButtons()}
                            </Box>
                        </Flex>
                    );
                }}
            </ManagedForm>
        </Box>
    );
};

export default UpdateLessonTestPassForm;
