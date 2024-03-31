import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { EntityNames, MutationKeys, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { queryClient } from "@app/providers";
import { ToastType, createNotification, invalidateQueriesWithPredicate } from "@shared/utils";
import { UpdateAdminUserNotificationRequest, UpdateAdminUserNotificationResponse, notificationApi } from "@entities/notification";
import { User } from "@entities/auth";

export const useUpdateAdminUserNotification = (
    userId: string
): UseMutationResult<
    UpdateAdminUserNotificationResponse,
    AxiosError<FormErrorResponse>,
    Omit<UpdateAdminUserNotificationRequest, "userId">
> => {
    return useMutation(
        [MutationKeys.UPDATE_ADMIN_NOTIFICATION],
        (data) => notificationApi.updateAdminUserNotification({ ...data, userId }),
        {
            onMutate: async (updatedNotification) => {
                await queryClient.cancelQueries({ queryKey: [QueryKeys.GET_ADMIN_USER, [EntityNames.USER], userId] });
                await queryClient.cancelQueries({ queryKey: [QueryKeys.GET_ADMIN_STUDENT, [EntityNames.STUDENT], userId] });

                const previousUserData = queryClient.getQueryData<User>([QueryKeys.GET_ADMIN_USER, [EntityNames.USER], userId]);
                const previousStudentData = queryClient.getQueryData<User>([QueryKeys.GET_ADMIN_STUDENT, [EntityNames.STUDENT], userId]);

                queryClient.setQueryData<User>(
                    [QueryKeys.GET_ADMIN_USER, [EntityNames.USER], userId],
                    (previousData) =>
                        previousData && {
                            ...previousData,
                            notifications: {
                                ...previousData.notifications,
                                [updatedNotification.notification]: updatedNotification.isActive,
                            },
                        }
                );

                queryClient.setQueryData<User>(
                    [QueryKeys.GET_ADMIN_STUDENT, [EntityNames.STUDENT], userId],
                    (previousData) =>
                        previousData && {
                            ...previousData,
                            notifications: {
                                ...previousData.notifications,
                                [updatedNotification.notification]: updatedNotification.isActive,
                            },
                        }
                );

                return { previousUserData, previousStudentData };
            },
            onError: (err, _, context) => {
                if (typeof context === "object" && "previousUserData" in context) {
                    queryClient.setQueryData([QueryKeys.GET_ADMIN_USER, [EntityNames.USER], userId], context.previousUserData);
                }

                if (typeof context === "object" && "previousStudentData" in context) {
                    queryClient.setQueryData([QueryKeys.GET_ADMIN_STUDENT, [EntityNames.STUDENT], userId], context.previousStudentData);
                }

                createNotification({
                    type: ToastType.WARN,
                    title: "Ошибка обновления настроек уведомлений",
                });
            },
            onSettled: () => {
                queryClient.invalidateQueries([QueryKeys.GET_ADMIN_USER, [EntityNames.USER], userId]);
                queryClient.invalidateQueries([QueryKeys.GET_ADMIN_STUDENT, [EntityNames.STUDENT], userId]);
                invalidateQueriesWithPredicate({ entityName: EntityNames.NOTIFICATION });
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
