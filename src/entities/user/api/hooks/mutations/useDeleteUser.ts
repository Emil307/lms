import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { MutationKeys } from "@shared/constant";
import { usersApi } from "@entities/user";

export const useDeleteUser = (): UseMutationResult<unknown, unknown, string, unknown> => {
    return useMutation([MutationKeys.DELETE_USER], (id) => usersApi.deleteUser(id));
};
