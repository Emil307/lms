import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { queryClient } from "@app/providers";
import { usersApi } from "../api";

export const useDeactivateUser = (): UseMutationResult<unknown, unknown, string, unknown> => {
    return useMutation([MutationKeys.DEACTIVATE_USER], (id) => usersApi.deactivateUser(id), {
        onSuccess: () => {
            queryClient.invalidateQueries([QueryKeys.GET_USERS]);
        },
    });
};
