import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { DeleteAdminGroupScheduleRequest, DeleteAdminGroupScheduleResponse, groupApi } from "@entities/group";
import { ToastType, createNotification } from "@shared/utils";
import { queryClient } from "@app/providers";

export const useAdminDeleteGroupSchedule = (
    data: DeleteAdminGroupScheduleRequest
): UseMutationResult<DeleteAdminGroupScheduleResponse, AxiosError<FormErrorResponse>, null> => {
    return useMutation([MutationKeys.DELETE_ADMIN_GROUP_SCHEDULE, data], () => groupApi.deleteAdminGroupSchedule(data), {
        onSuccess: () => {
            createNotification({
                type: ToastType.SUCCESS,
                title: "Удаление занятия из расписания",
                message: `Занятие успешно удалено`,
            });

            queryClient.invalidateQueries([QueryKeys.GET_ADMIN_GROUP_SCHEDULES]);
        },
        onError: () => {
            createNotification({
                type: ToastType.WARN,
                title: "Ошибка удаления занятия из расписания",
            });
        },
    });
};
