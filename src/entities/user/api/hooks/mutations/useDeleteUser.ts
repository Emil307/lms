import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { EntityNames, MutationKeys, QueryKeys } from "@shared/constant";
import { DeleteUserRequest, DeleteUserResponse, userApi } from "@entities/user";
import { createNotification, invalidateQueriesWithPredicate, ToastType } from "@shared/utils";
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

            invalidateQueriesWithPredicate({ entityName: EntityNames.USER, exclude: [QueryKeys.GET_ADMIN_USER] });
            invalidateQueriesWithPredicate({ entityName: EntityNames.STUDENT, exclude: [QueryKeys.GET_ADMIN_STUDENT] });
        },
        onError: () => {
            createNotification({
                type: ToastType.WARN,
                title: "Ошибка удаления пользователя",
            });
        },
    });
};
