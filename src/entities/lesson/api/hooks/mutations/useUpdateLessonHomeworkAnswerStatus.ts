import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { EntityNames, MutationKeys, QueryKeys } from "@shared/constant";
import { ToastType, createNotification, invalidateQueriesWithPredicate } from "@shared/utils";
import { FormErrorResponse } from "@shared/types";
import { queryClient } from "@app/providers";
import { lessonApi, UpdateAdminHomeworkAnswerStatusRequest, UpdateAdminHomeworkAnswerStatusResponse } from "@entities/lesson";

export const useUpdateLessonHomeworkAnswerStatus = (
    data: UpdateAdminHomeworkAnswerStatusRequest
): UseMutationResult<UpdateAdminHomeworkAnswerStatusResponse, AxiosError<FormErrorResponse>, null> => {
    return useMutation(
        [MutationKeys.UPDATE_LESSON_HOMEWORK_ANSWER_STATUS, data.id],
        () => lessonApi.updateAdminHomeworkAnswerStatus(data),
        {
            onSuccess: () => {
                createNotification({
                    type: ToastType.INFO,
                    title: "Изменение статуса",
                    message: `Домашнее задание “Выполнено”`,
                });

                queryClient.invalidateQueries([
                    QueryKeys.GET_ADMIN_LESSON_HOMEWORK_ANSWER,
                    [EntityNames.LESSON_HOMEWORK, EntityNames.COURSE, EntityNames.GROUP, EntityNames.STUDENT, EntityNames.COURSE_MODULE],
                    data.id,
                ]);
                queryClient.invalidateQueries([QueryKeys.GET_ADMIN_LESSON_HOMEWORK_ANSWERS]);
                queryClient.invalidateQueries([QueryKeys.GET_ADMIN_GROUP_STUDENT_STATISTICS]);
                queryClient.invalidateQueries([QueryKeys.GET_ADMIN_COURSE_STATISTICS]);
                invalidateQueriesWithPredicate({ entityName: EntityNames.NOTIFICATION });
            },
            onError: () => {
                createNotification({
                    type: ToastType.WARN,
                    title: "Ошибка изменения статуса",
                });
            },
        }
    );
};
