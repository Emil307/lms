import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { EntityNames, MutationKeys, QueryKeys } from "@shared/constant";
import { queryClient } from "@app/providers";
import { TUser, GetUsersResponse, userApi, UpdateUserActivityResponse, UpdateUserActivityRequest } from "@entities/user";
import { FormErrorResponse } from "@shared/types";
import { ToastType, createNotification } from "@shared/utils";

export const useUpdateUserActivity = ({
    id,
    fio,
}: Pick<UpdateUserActivityRequest, "id"> & { fio: string }): UseMutationResult<
    UpdateUserActivityResponse,
    AxiosError<FormErrorResponse>,
    boolean
> => {
    return useMutation([MutationKeys.UPDATE_USER_ACTIVITY, id], (isActive) => userApi.updateUserActivity({ id, isActive }), {
        onMutate: async (isActive) => {
            await queryClient.cancelQueries({ queryKey: [QueryKeys.GET_ADMIN_USER, [EntityNames.USER], id] });
            await queryClient.cancelQueries({ queryKey: [QueryKeys.GET_ADMIN_USERS, [EntityNames.USER]] });
            await queryClient.cancelQueries({ queryKey: [QueryKeys.GET_ADMIN_STUDENT, [EntityNames.STUDENT], id] });
            await queryClient.cancelQueries({ queryKey: [QueryKeys.GET_ADMIN_STUDENTS, [EntityNames.STUDENT]] });

            const previousUserData = queryClient.getQueryData<TUser>([QueryKeys.GET_ADMIN_USER, [EntityNames.USER], id]);
            const previousStudentData = queryClient.getQueryData<TUser>([QueryKeys.GET_ADMIN_STUDENT, [EntityNames.STUDENT], id]);

            queryClient.setQueryData<TUser>(
                [QueryKeys.GET_ADMIN_USER, [EntityNames.USER], id],
                (previousData) => previousData && { ...previousData, isActive }
            );

            queryClient.setQueryData<TUser>(
                [QueryKeys.GET_ADMIN_STUDENT, [EntityNames.STUDENT], id],
                (previousData) => previousData && { ...previousData, isActive }
            );

            queryClient.setQueriesData<GetUsersResponse>([QueryKeys.GET_ADMIN_USERS, [EntityNames.USER]], (previousData) => {
                if (!previousData) {
                    return undefined;
                }

                return {
                    ...previousData,
                    data: previousData.data.map((user) => (String(user.id) === id ? { ...user, isActive } : user)),
                };
            });

            queryClient.setQueriesData<GetUsersResponse>([QueryKeys.GET_ADMIN_STUDENTS, [EntityNames.STUDENT]], (previousData) => {
                if (!previousData) {
                    return undefined;
                }

                return {
                    ...previousData,
                    data: previousData.data.map((student) => (String(student.id) === id ? { ...student, isActive } : student)),
                };
            });

            return { previousUserData, previousStudentData };
        },
        onError: (err, _, context) => {
            if (typeof context === "object" && "previousUserData" in context) {
                queryClient.setQueryData([QueryKeys.GET_ADMIN_USER, [EntityNames.USER], id], context.previousUserData);
            }
            if (typeof context === "object" && "previousStudentData" in context) {
                queryClient.setQueryData([QueryKeys.GET_ADMIN_STUDENT, [EntityNames.STUDENT], id], context.previousStudentData);
            }
            createNotification({
                type: ToastType.WARN,
                title: "Ошибка изменения статуса",
                message: err.response?.data.message,
            });
        },
        onSettled: () => {
            queryClient.invalidateQueries([QueryKeys.GET_ADMIN_USERS]);
            queryClient.invalidateQueries([QueryKeys.GET_ADMIN_STUDENTS]);
            queryClient.invalidateQueries([QueryKeys.GET_ADMIN_GROUP_STUDENTS]);
            queryClient.invalidateQueries([QueryKeys.GET_ADMIN_STUDENTS_NO_INCLUDED_GROUP]);
        },
        onSuccess: ({ isActive }) => {
            const statusMessage = isActive ? "активирован" : "деактивирован";
            createNotification({
                type: ToastType.INFO,
                title: "Изменение статуса",
                message: `Пользователь "${fio}" ${statusMessage}.`,
            });
        },
    });
};
