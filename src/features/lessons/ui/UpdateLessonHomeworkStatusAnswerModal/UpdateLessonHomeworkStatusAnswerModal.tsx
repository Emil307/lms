import React from "react";
import { lessonApi, UpdateAdminHomeworkAnswerStatusResponse } from "@entities/lesson";
import { createNotification, ToastType } from "@shared/utils";
import { Button, FTextarea, ManagedForm } from "@shared/ui";
import { initialValues } from "./constants";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { Flex } from "@mantine/core";
import {
    $UpdateHomeworkAnswerStatusFormValues,
    UpdateHomeworkAnswerStatusFormValues,
} from "@features/lessons/ui/UpdateLessonHomeworkStatusAnswerModal/types";

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
            keysInvalidateQueries={[
                { queryKey: [QueryKeys.GET_ADMIN_LESSON_HOMEWORK_ANSWER, homeworkAnswerId] },
                { queryKey: [QueryKeys.GET_ADMIN_LESSON_HOMEWORK_ANSWERS] },
            ]}
            mutationFunction={updateHomeworkAnswerStatus}
            onSuccess={onSuccessCreate}
            onError={onError}
            disableOverlay>
            {({ isLoading }) => (
                <Flex gap={24} direction="column">
                    <FTextarea name="content" placeholder="Опишите принятое решение" minRows={6} />
                    <Flex gap={8}>
                        <Button variant="border" size="large" onClick={onClose} disabled={isLoading} w="50%">
                            Отмена
                        </Button>
                        <Button type="submit" variant="secondary" size="large" loading={isLoading} w="50%">
                            Сохранить
                        </Button>
                    </Flex>
                </Flex>
            )}
        </ManagedForm>
    );
};

export default UpdateLessonHomeworkStatusAnswerModal;
