import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { EntityNames, MutationKeys, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { queryClient } from "@app/providers";
import { ToastType, createNotification, invalidateQueriesWithPredicate } from "@shared/utils";
import { UpdateUserNotificationRequest, UpdateUserNotificationResponse, notificationApi } from "@entities/notification";
import { User } from "@entities/auth";

export const useUpdateUserNotification = (): UseMutationResult<
    UpdateUserNotificationResponse,
    AxiosError<FormErrorResponse>,
    UpdateUserNotificationRequest
> => {
    return useMutation([MutationKeys.UPDATE_NOTIFICATION], (data) => notificationApi.updateUserNotification(data), {
        onMutate: async (updatedNotification) => {
            await queryClient.cancelQueries({
                queryKey: [QueryKeys.GET_ME, [EntityNames.AUTH]],
            });

            const previousUserData = queryClient.getQueryData<User>([QueryKeys.GET_ME, [EntityNames.AUTH]]);

            queryClient.setQueryData<User>(
                [QueryKeys.GET_ME, [EntityNames.AUTH]],
                (previousData) =>
                    previousData && {
                        ...previousData,
                        notifications: {
                            ...previousData.notifications,
                            [updatedNotification.notification]: updatedNotification.isActive,
                        },
                    }
            );

            return { previousUserData };
        },
        onError: (err, _, context) => {
            if (typeof context === "object" && "previousUserData" in context) {
                queryClient.setQueryData([QueryKeys.GET_ME, [EntityNames.AUTH]], context.previousUserData);
            }

            createNotification({
                type: ToastType.WARN,
                title: "Ошибка обновления настроек уведомлений",
            });
        },
        onSettled: () => {
            queryClient.invalidateQueries([QueryKeys.GET_ME]);
            invalidateQueriesWithPredicate({ entityName: EntityNames.NOTIFICATION });
        },
        onSuccess: () => {
            createNotification({
                type: ToastType.SUCCESS,
                title: "Изменения сохранены",
            });
        },
    });
};
