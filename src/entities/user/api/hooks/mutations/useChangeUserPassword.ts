import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { ChangeUserPasswordRequest, usersApi } from "@entities/user";
import { queryClient } from "@app/providers";

export const useChangeUserPassword = (id?: number): UseMutationResult<void, unknown, Omit<ChangeUserPasswordRequest, "id">> => {
    return useMutation(
        [MutationKeys.CHANGE_USER_PASSWORD, id],
        (data) => usersApi.changeUserPassword({ id, ...data }),

        {
            onSuccess: () => {
                queryClient.invalidateQueries([QueryKeys.GET_USER, id]);
            },
        }
    );
};
