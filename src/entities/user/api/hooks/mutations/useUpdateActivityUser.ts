import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { queryClient } from "@app/providers";
import { TUser, GetUsersResponse, usersApi } from "@entities/user";
import { FormErrorResponse } from "@shared/types";
import { ToastType, createNotification, getFullNameFromProfile } from "@shared/utils";

export const useUpdateActivityStatusUser = (id: string): UseMutationResult<void, AxiosError<FormErrorResponse>, boolean> => {
    return useMutation([MutationKeys.UPDATE_ACTIVITY_USER], (isActive) => usersApi.updateActivityStatusUser({ id, isActive }), {
        onMutate: async (updatedStatus) => {
            await queryClient.cancelQueries({ queryKey: [QueryKeys.GET_USER, id] });
            await queryClient.cancelQueries({ queryKey: [QueryKeys.GET_USERS] });
            await queryClient.cancelQueries({ queryKey: [QueryKeys.GET_STUDENTS] });

            const previousUserData = queryClient.getQueryData<TUser>([QueryKeys.GET_USER, id]);
            const previousUsersData = queryClient.getQueriesData<GetUsersResponse>([QueryKeys.GET_USERS]);
            const previousStudentsData = queryClient.getQueriesData<GetUsersResponse>([QueryKeys.GET_STUDENTS]);

            queryClient.setQueryData<TUser>(
                [QueryKeys.GET_USER, id],
                (previousData) => previousData && { ...previousData, isActive: updatedStatus }
            );

            queryClient.setQueriesData<GetUsersResponse>([QueryKeys.GET_USERS], (previousData) => {
                if (!previousData) {
                    return undefined;
                }

                return {
                    ...previousData,
                    data: previousData.data.map((user) => (String(user.id) === id ? { ...user, isActive: updatedStatus } : user)),
                };
            });

            queryClient.setQueriesData<GetUsersResponse>([QueryKeys.GET_STUDENTS], (previousData) => {
                if (!previousData) {
                    return undefined;
                }

                return {
                    ...previousData,
                    data: previousData.data.map((student) =>
                        String(student.id) === id ? { ...student, isActive: updatedStatus } : student
                    ),
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
            });
        },
        onSettled: () => {
            queryClient.invalidateQueries([QueryKeys.GET_USERS]);
        },
        onSuccess: () => {
            const userData = queryClient.getQueryData<TUser>([QueryKeys.GET_USER, id]);
            const userFromList = queryClient
                .getQueriesData<GetUsersResponse>([QueryKeys.GET_USERS])?.[0]?.[1]
                ?.data.find((user) => user.id.toString() === id);

            const studentFromList = queryClient
                .getQueriesData<GetUsersResponse>([QueryKeys.GET_STUDENTS])?.[0]?.[1]
                ?.data.find((user) => user.id.toString() === id);

            const statusMessage = userData?.isActive ? "активирован" : "деактивирован";
            const fio = getFullNameFromProfile(userData?.profile || userFromList?.profile || studentFromList?.profile);
            createNotification({
                type: ToastType.INFO,
                title: "Изменение статуса",
                message: `Пользователь "${fio}" ${statusMessage}.`,
            });
        },
    });
};
