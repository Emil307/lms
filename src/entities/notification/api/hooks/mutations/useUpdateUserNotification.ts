import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { queryClient } from "@app/providers";
import { ToastType, createNotification } from "@shared/utils";
import { UpdateUserNotificationRequest, UpdateUserNotificationResponse, notificationApi } from "@entities/notification";
import { User } from "@entities/auth";

export const useUpdateUserNotification = () => {
    return useMutation<UpdateUserNotificationResponse, AxiosError<FormErrorResponse>, UpdateUserNotificationRequest>(
        [MutationKeys.UPDATE_NOTIFICATION],
        (data) => notificationApi.updateUserNotification(data),
        {
            onMutate: async (updatedNotification) => {
                await queryClient.cancelQueries({ queryKey: [QueryKeys.GET_ME] });

                const previousUserData = queryClient.getQueryData<User>([QueryKeys.GET_ME]);

                queryClient.setQueryData<User>(
                    [QueryKeys.GET_ME],
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
                if (typeof context === "object" && context !== null && "previousUserData" in context) {
                    queryClient.setQueryData([QueryKeys.GET_ME], context.previousUserData);
                }

                createNotification({
                    type: ToastType.WARN,
                    title: "Ошибка обновления настроек уведомлений",
                });
            },
            onSettled: () => {
                queryClient.invalidateQueries([QueryKeys.GET_ME]);
            },
            onSuccess: () => {
                createNotification({
                    type: ToastType.SUCCESS,
                    title: "Изменения сохранены",
                });
            },
        }
    );
};
