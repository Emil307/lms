import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { EntityNames, MutationKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { ToastType, createNotification, invalidateQueriesWithPredicate } from "@shared/utils";
import { ReadAllNotificationsResponse, notificationApi } from "@entities/notification";

export const useReadAllNotifications = (): UseMutationResult<ReadAllNotificationsResponse, AxiosError<FormErrorResponse>> => {
    return useMutation([MutationKeys.READ_ALL_NOTIFICATIONS], () => notificationApi.readAllNotifications(), {
        onSuccess: () => {
            createNotification({
                type: ToastType.SUCCESS,
                title: "Все уведомления прочитаны",
            });

            invalidateQueriesWithPredicate({ entityName: EntityNames.NOTIFICATION });
        },
    });
};
