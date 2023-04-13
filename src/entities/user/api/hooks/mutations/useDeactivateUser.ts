import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { queryClient } from "@app/providers";
import { usersApi } from "@entities/user";

export const useDeactivateUser = (id: string): UseMutationResult<unknown, unknown, void, unknown> => {
    return useMutation([MutationKeys.DEACTIVATE_USER], () => usersApi.deactivateUser(id), {
        onSuccess: () => {
            queryClient.invalidateQueries([QueryKeys.GET_USER, id]);
            queryClient.invalidateQueries([QueryKeys.GET_USERS]);
        },
    });
};
