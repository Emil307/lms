import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { MutationKeys, QueryKeys } from "@shared/constant";
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
    Omit<UpdateUserActivityRequest, "id">
> => {
    return useMutation([MutationKeys.UPDATE_USER_ACTIVITY, id], (data) => userApi.updateUserActivity({ ...data, id }), {
        onMutate: async ({ isActive }) => {
            await queryClient.cancelQueries({ queryKey: [QueryKeys.GET_USER, id] });
            await queryClient.cancelQueries({ queryKey: [QueryKeys.GET_USERS] });
            await queryClient.cancelQueries({ queryKey: [QueryKeys.GET_STUDENTS] });

            const previousUserData = queryClient.getQueryData<TUser>([QueryKeys.GET_USER, id]);
            const previousUsersData = queryClient.getQueriesData<GetUsersResponse>([QueryKeys.GET_USERS]);
            const previousStudentsData = queryClient.getQueriesData<GetUsersResponse>([QueryKeys.GET_STUDENTS]);

            queryClient.setQueryData<TUser>([QueryKeys.GET_USER, id], (previousData) => previousData && { ...previousData, isActive });

            queryClient.setQueriesData<GetUsersResponse>([QueryKeys.GET_USERS], (previousData) => {
                if (!previousData) {
                    return undefined;
                }

                return {
                    ...previousData,
                    data: previousData.data.map((user) => (String(user.id) === id ? { ...user, isActive } : user)),
                };
            });

            queryClient.setQueriesData<GetUsersResponse>([QueryKeys.GET_STUDENTS], (previousData) => {
                if (!previousData) {
                    return undefined;
                }

                return {
                    ...previousData,
                    data: previousData.data.map((student) => (String(student.id) === id ? { ...student, isActive } : student)),
                };
            });

            return { previousUserData, previousUsersData, previousStudentsData };
        },
        onError: (err, _, context) => {
            if (typeof context === "object" && "previousUserData" in context) {
                queryClient.setQueryData([QueryKeys.GET_USER, id], context.previousUserData);
            }
            if (typeof context === "object" && "previousUsersData" in context) {
                queryClient.setQueriesData([QueryKeys.GET_USERS], context.previousUsersData);
            }
            if (typeof context === "object" && "previousStudentsData" in context) {
                queryClient.setQueriesData([QueryKeys.GET_STUDENTS], context.previousStudentsData);
            }

            createNotification({
                type: ToastType.WARN,
                title: "Ошибка изменения статуса",
                message: err.response?.data.message,
            });
        },
        onSettled: () => {
            queryClient.invalidateQueries([QueryKeys.GET_USERS]);
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
