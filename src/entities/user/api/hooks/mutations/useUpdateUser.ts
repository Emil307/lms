import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { UpdateUserRequest, UserDetailResponse, usersApi } from "@entities/user";
import { queryClient } from "@app/providers";

export const useUpdateUser = (id?: number): UseMutationResult<UserDetailResponse, unknown, UpdateUserRequest> => {
    return useMutation([MutationKeys.UPDATE_USER, id], (data) => usersApi.updateUser({ id, ...data }), {
        onSuccess: () => {
            queryClient.invalidateQueries([QueryKeys.GET_USER, id]);
        },
    });
};
