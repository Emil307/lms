import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { MutationKeys } from "@shared/constant";
import { usersApi } from "../api";

export const useDeleteUser = (): UseMutationResult<unknown, unknown, number, unknown> => {
    return useMutation([MutationKeys.DELETE_USER], (id) => usersApi.deleteUser(id));
};
