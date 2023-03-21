import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { QueryKeys } from "@shared/constant";
import { usersApi } from "../api";

export const useDeleteUser = (): UseMutationResult<unknown, unknown, number, unknown> => {
    return useMutation([QueryKeys.DELETE_USER], (id) => usersApi.deleteUser(id));
};
