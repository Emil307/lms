import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { queryClient } from "@app/providers";
import { ToastType, createNotification } from "@shared/utils";
import { UpdateAdminUserNotificationRequest, UpdateAdminUserNotificationResponse, notificationApi } from "@entities/notification";
import { User } from "@entities/auth";

export const useUpdateAdminUserNotification = (userId: string) => {
    return useMutation<
        UpdateAdminUserNotificationResponse,
        AxiosError<FormErrorResponse>,
        Omit<UpdateAdminUserNotificationRequest, "userId">
    >([MutationKeys.UPDATE_ADMIN_NOTIFICATION], (data) => notificationApi.updateAdminUserNotification({ ...data, userId }), {
        onMutate: async (updatedNotification) => {
            await queryClient.cancelQueries({ queryKey: [QueryKeys.GET_ADMIN_USER, userId] });

            const previousUserData = queryClient.getQueryData<User>([QueryKeys.GET_ADMIN_USER, userId]);

            queryClient.setQueryData<User>(
                [QueryKeys.GET_ADMIN_USER, userId],
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
                queryClient.setQueryData([QueryKeys.GET_ADMIN_USER, userId], context.previousUserData);
            }

            createNotification({
                type: ToastType.WARN,
                title: "Ошибка обновления настроек уведомлений",
            });
        },
        onSettled: () => {
            queryClient.invalidateQueries([QueryKeys.GET_ADMIN_USER, userId]);
        },
        onSuccess: () => {
            createNotification({
                type: ToastType.SUCCESS,
                title: "Изменения сохранены",
            });
        },
    });
};
