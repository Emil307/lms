import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { queryClient } from "@app/providers";
import { usersApi } from "../api";

export const useActivateUser = (): UseMutationResult<unknown, unknown, string, unknown> => {
    return useMutation([MutationKeys.ACTIVATE_USER], (id) => usersApi.activateUser(id), {
        onSuccess: () => {
            queryClient.invalidateQueries([QueryKeys.GET_USERS]);
        },
    });
};
