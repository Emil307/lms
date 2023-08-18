import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { DeleteUserRequest, DeleteUserResponse, userApi } from "@entities/user";
import { queryClient } from "@app/providers";
import { createNotification, ToastType } from "@shared/utils";
import { FormErrorResponse } from "@shared/types";

export const useDeleteUser = ({
    id,
    fio,
}: DeleteUserRequest & { fio: string }): UseMutationResult<DeleteUserResponse, AxiosError<FormErrorResponse>> => {
    return useMutation([MutationKeys.DELETE_USER, id], () => userApi.deleteUser({ id }), {
        onSuccess: () => {
            createNotification({
                type: ToastType.SUCCESS,
                title: "Удаление пользователя",
                message: `Пользователь "${fio}" успешно удален`,
            });
            queryClient.invalidateQueries([QueryKeys.GET_ADMIN_USERS]);
            queryClient.invalidateQueries([QueryKeys.GET_ADMIN_STUDENTS]);
        },
        onError: () => {
            createNotification({
                type: ToastType.WARN,
                title: "Ошибка удаления пользователя",
            });
        },
    });
};
