import React from "react";
import { Flex } from "@mantine/core";
import { lessonApi, UpdateAdminHomeworkAnswerStatusResponse } from "@entities/lesson";
import { createNotification, ToastType } from "@shared/utils";
import { FControlButtons, FTextarea, ManagedForm } from "@shared/ui";
import { EntityNames, MutationKeys, QueryKeys } from "@shared/constant";
import {
    $UpdateHomeworkAnswerStatusFormValues,
    UpdateHomeworkAnswerStatusFormValues,
} from "@features/lessons/ui/UpdateLessonHomeworkStatusAnswerModal/types";
import { initialValues } from "./constants";

interface UpdateLessonHomeworkStatusAnswerModalProps {
    homeworkAnswerId: string;
    onClose: () => void;
}

const UpdateLessonHomeworkStatusAnswerModal = ({ homeworkAnswerId, onClose }: UpdateLessonHomeworkStatusAnswerModalProps) => {
    const updateHomeworkAnswerStatus = ({ content }: UpdateHomeworkAnswerStatusFormValues) => {
        return lessonApi.updateAdminHomeworkAnswerStatus({ id: homeworkAnswerId, status: "needsEdit", content: content || null });
    };

    const onSuccessCreate = () => {
        createNotification({
            type: ToastType.SUCCESS,
            title: "Изменение статуса",
            message: "Домашнее задание “На доработку”",
        });
        onClose();
    };

    const onError = () => {
        createNotification({
            type: ToastType.WARN,
            title: "Ошибка изменения статуса",
        });
    };

    return (
        <ManagedForm<UpdateHomeworkAnswerStatusFormValues, UpdateAdminHomeworkAnswerStatusResponse>
            initialValues={initialValues}
            validationSchema={$UpdateHomeworkAnswerStatusFormValues}
            mutationKey={[MutationKeys.UPDATE_LESSON_HOMEWORK_ANSWER_STATUS, homeworkAnswerId]}
            invalidateQueriesWithPredicateParams={{ entityName: EntityNames.LESSON_HOMEWORK }}
            keysInvalidateQueries={[{ queryKey: [QueryKeys.GET_NOTIFICATIONS] }, { queryKey: [QueryKeys.GET_NEW_NOTIFICATIONS] }]}
            mutationFunction={updateHomeworkAnswerStatus}
            onSuccess={onSuccessCreate}
            onError={onError}
            disableOverlay>
            {() => (
                <Flex gap={24} direction="column">
                    <FTextarea name="content" placeholder="Опишите принятое решение" minRows={6} />
                    <FControlButtons variant="modal" cancelButtonText="Отмена" onClose={onClose} />
                </Flex>
            )}
        </ManagedForm>
    );
};

export default UpdateLessonHomeworkStatusAnswerModal;
