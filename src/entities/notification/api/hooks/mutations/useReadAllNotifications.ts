import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { ToastType, createNotification } from "@shared/utils";
import { ReadAllNotificationsResponse, notificationApi } from "@entities/notification";
import { queryClient } from "@app/providers";

export const useReadAllNotifications = () => {
    return useMutation<ReadAllNotificationsResponse, AxiosError<FormErrorResponse>>(
        [MutationKeys.READ_ALL_NOTIFICATIONS],
        () => notificationApi.readAllNotifications(),
        {
            onSuccess: () => {
                queryClient.invalidateQueries([QueryKeys.GET_NOTIFICATIONS]);
                queryClient.invalidateQueries([QueryKeys.GET_NEW_NOTIFICATIONS]);
                createNotification({
                    type: ToastType.SUCCESS,
                    title: "Все уведомления прочитаны",
                });
            },
        }
    );
};
