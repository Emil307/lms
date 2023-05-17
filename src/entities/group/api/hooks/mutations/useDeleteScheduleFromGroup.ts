import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { RemoveScheduleFromGroupRequest, groupApi } from "@entities/group";
import { ToastType, createNotification } from "@shared/utils";

export const useDeleteScheduleFromGroup = (data: RemoveScheduleFromGroupRequest) => {
    const queryClient = useQueryClient();
    return useMutation<void, AxiosError<FormErrorResponse>, null>(
        [MutationKeys.ADD_SCHEDULE_TO_GROUP, data],
        () => groupApi.removeScheduleFromGroup(data),
        {
            onSuccess: () => {
                createNotification({
                    type: ToastType.SUCCESS,
                    title: "Удаление занятия",
                    message: `Занятие успешно удалено`,
                });

                queryClient.invalidateQueries([QueryKeys.GET_GROUP_SCHEDULES]);
            },
            onError: () => {
                createNotification({
                    type: ToastType.WARN,
                    title: "Ошибка удаления занятия",
                });
            },
        }
    );
};
