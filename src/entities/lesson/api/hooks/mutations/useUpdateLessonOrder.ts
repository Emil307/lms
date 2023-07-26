import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { queryClient } from "@app/providers";
import { ToastType, createNotification } from "@shared/utils";
import { UpdateLessonOrderRequest, UpdateLessonOrderResponse, lessonApi } from "@entities/lesson";

export const useUpdateLessonOrder = ({
    moduleId,
}: Omit<UpdateLessonOrderRequest, "after" | "lessonId">): UseMutationResult<
    UpdateLessonOrderResponse,
    AxiosError<FormErrorResponse>,
    Pick<UpdateLessonOrderRequest, "after" | "lessonId">
> => {
    return useMutation([MutationKeys.UPDATE_LESSON_ORDER, moduleId], (data) => lessonApi.updateLessonOrder({ ...data, moduleId }), {
        onSuccess: () => {
            createNotification({
                type: ToastType.SUCCESS,
                title: "Изменения сохранены",
            });
        },
        onError: () => {
            createNotification({
                type: ToastType.WARN,
                title: "Ошибка обновления порядка уроков",
            });
        },
        onSettled: () => {
            queryClient.invalidateQueries([QueryKeys.GET_ADMIN_COURSE_MODULE, moduleId]);
        },
    });
};
