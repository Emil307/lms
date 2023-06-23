import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { userApi } from "@entities/user";
import { queryClient } from "@app/providers";

export const useDeleteUser = (): UseMutationResult<unknown, unknown, string, unknown> => {
    return useMutation([MutationKeys.DELETE_USER], (id) => userApi.deleteUser(id), {
        onSuccess: () => {
            queryClient.invalidateQueries([QueryKeys.GET_USERS]);
            queryClient.invalidateQueries([QueryKeys.GET_STUDENTS]);
        },
    });
};
