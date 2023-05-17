import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { UpdateScheduleFromGroupRequest, groupApi } from "@entities/group";
import { ToastType, createNotification } from "@shared/utils";

export const useUpdateScheduleFromGroup = (groupId?: string) => {
    const queryClient = useQueryClient();
    return useMutation<void, AxiosError<FormErrorResponse>, UpdateScheduleFromGroupRequest>(
        [MutationKeys.ADD_SCHEDULE_TO_GROUP],
        (data) => groupApi.updateScheduleFromGroup({ groupId, ...data }),
        {
            onSuccess: () => {
                createNotification({
                    type: ToastType.SUCCESS,
                    title: "Изменения сохранены",
                });

                queryClient.invalidateQueries([QueryKeys.GET_GROUP_SCHEDULES]);
            },
            onError: () => {
                createNotification({
                    type: ToastType.WARN,
                    title: "Ошибка обновления занятия",
                });
            },
        }
    );
};
