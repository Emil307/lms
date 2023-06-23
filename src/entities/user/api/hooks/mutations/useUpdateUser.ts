import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { UpdateUserRequest, UserDetailResponse, userApi } from "@entities/user";
import { queryClient } from "@app/providers";
import { createNotification, ToastType } from "@shared/utils";

export const useUpdateUser = (id?: number): UseMutationResult<UserDetailResponse, unknown, UpdateUserRequest> => {
    return useMutation([MutationKeys.UPDATE_USER, id], (data) => userApi.updateUser({ id, ...data }), {
        onSuccess: () => {
            queryClient.invalidateQueries([QueryKeys.GET_USER, id]);

            createNotification({
                type: ToastType.SUCCESS,
                title: "Изменения сохранены",
            });
        },
    });
};
