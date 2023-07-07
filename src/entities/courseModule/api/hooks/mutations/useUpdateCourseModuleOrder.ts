import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { queryClient } from "@app/providers";
import { ToastType, createNotification } from "@shared/utils";
import { UpdateCourseModuleOrderRequest, UpdateCourseModuleOrderResponse } from "../../types";
import { courseModuleApi } from "../../courseModuleApi";

export const useUpdateCourseModuleOrder = (
    courseId: string,
): UseMutationResult<UpdateCourseModuleOrderResponse, AxiosError<FormErrorResponse>, Omit<UpdateCourseModuleOrderRequest, "courseId">> => {
    return useMutation(
        [MutationKeys.UPDATE_COURSE_MODULE_ORDER, courseId],
        (data) => courseModuleApi.updateModuleOrder({ ...data, courseId }),
        {
            onSuccess: () => {
                createNotification({
                    type: ToastType.SUCCESS,
                    title: "Изменения сохранены",
                });
            },
            onError: () => {
                createNotification({
                    type: ToastType.WARN,
                    title: "Ошибка обновления порядка модулей",
                });
            },
            onSettled: () => {
                queryClient.invalidateQueries([QueryKeys.GET_COURSE_MODULES, courseId]);
            },
        },
    );
};
