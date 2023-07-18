import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { queryClient } from "@app/providers";
import { ToastType, createNotification } from "@shared/utils";
import { lessonApi, UpdateAdminTestRequest, UpdateAdminTestResponse } from "@entities/lesson";

export const useUpdateAdminLessonTest = (lessonId: string) => {
    return useMutation<UpdateAdminTestResponse, AxiosError<FormErrorResponse>, Omit<UpdateAdminTestRequest, "lessonId">>(
        [MutationKeys.UPDATE_LESSON_TEST, lessonId],
        (data) => lessonApi.updateAdminTest({ ...data, lessonId }),
        {
            onSuccess: () => {
                queryClient.invalidateQueries([QueryKeys.GET_ADMIN_LESSON_TEST, lessonId]);

                createNotification({
                    type: ToastType.SUCCESS,
                    title: "Изменения сохранены",
                });
            },
            onError: () => {
                createNotification({
                    type: ToastType.WARN,
                    title: "Ошибка обновления теста",
                });
            },
        }
    );
};
