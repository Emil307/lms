import { Box, BoxProps, Flex } from "@mantine/core";
import React from "react";
import { Button, FFileInputMultiple, FTextEditor, ManagedForm } from "@shared/ui";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { createNotification, ToastType, useMedia } from "@shared/utils";
import { GetHomeworkResponse, UpdateHomeworkAnswerResponse, lessonApi } from "@entities/lesson";
import { adaptUpdateLessonHomeworkAnswerRequest, getInitialValues } from "./utils";
import { $UpdateLessonHomeworkAnswerFormValidation, UpdateLessonHomeworkAnswerFormValidation } from "./types";

export interface UpdateLessonHomeworkAnswerFormProps extends Omit<BoxProps, "children"> {
    data?: GetHomeworkResponse;
    lessonId: string;
    courseId: string;
    hidden?: boolean;
    onClose: () => void;
    isEditableAnswer?: boolean;
}

const UpdateLessonHomeworkAnswerForm = ({
    data,
    lessonId,
    courseId,
    hidden,
    isEditableAnswer,
    onClose,
    ...props
}: UpdateLessonHomeworkAnswerFormProps) => {
    const isTablet = useMedia("md");

    const updateLessonHomeworkAnswer = (values: UpdateLessonHomeworkAnswerFormValidation) => {
        return lessonApi.updateHomeworkAnswer({ ...adaptUpdateLessonHomeworkAnswerRequest(values), lessonId, courseId });
    };

    const onSuccess = () => {
        createNotification({
            type: ToastType.SUCCESS,
            title: "Решение домашнего задание",
            message: "Ваше решение отправлено на проверку",
        });
        onClose();
    };

    const onError = () => {
        createNotification({
            type: ToastType.WARN,
            title: "Ошибка отправки решения домашнего задания",
        });
    };

    if (hidden) {
        return null;
    }

    const renderActions = (dirty: boolean, onCancel: () => void) => {
        if (isEditableAnswer) {
            return (
                <>
                    <Button variant="border" size={isTablet ? "medium" : "large"} onClick={onCancel} maw={200} w="100%">
                        Отмена
                    </Button>
                    <Button variant="secondary" type="submit" size={isTablet ? "medium" : "large"} maw={200} w="100%" disabled={!dirty}>
                        Отправить
                    </Button>
                </>
            );
        }

        return (
            <Button variant="secondary" type="submit" size="medium" maw={200} w="100%" disabled={!dirty}>
                Отправить
            </Button>
        );
    };

    return (
        <Box {...props}>
            <ManagedForm<UpdateLessonHomeworkAnswerFormValidation, UpdateHomeworkAnswerResponse>
                initialValues={getInitialValues(data)}
                validationSchema={$UpdateLessonHomeworkAnswerFormValidation}
                mutationKey={[MutationKeys.UPDATE_LESSON_HOMEWORK_ANSWER]}
                keysInvalidateQueries={[
                    { queryKey: [QueryKeys.GET_LESSON_HOMEWORK] },
                    { queryKey: [QueryKeys.GET_LESSON, lessonId, courseId] },
                ]}
                mutationFunction={updateLessonHomeworkAnswer}
                onSuccess={onSuccess}
                onError={onError}
                onCancel={onClose}
                hasConfirmModal>
                {({ dirty, onCancel }) => {
                    return (
                        <Flex direction="column" gap={24}>
                            <FTextEditor name="answer" contentHeight={272} />
                            <FFileInputMultiple
                                name="files"
                                type="document"
                                fileFormats={["jpg", "jpeg", "png", "pdf", "doc", "docx"]}
                                descriptionInside="jpg, png, pdf, doc, docx. До 8Mb"
                                h={190}
                                w="100%"
                            />
                            <Flex gap={16}>{renderActions(dirty, onCancel)}</Flex>
                        </Flex>
                    );
                }}
            </ManagedForm>
        </Box>
    );
};

export default UpdateLessonHomeworkAnswerForm;
