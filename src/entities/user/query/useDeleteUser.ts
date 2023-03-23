import { useMutation, UseMutationResult, useQuery } from "@tanstack/react-query";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { usersApi } from "../api";

export const useDeleteUser = (): UseMutationResult<unknown, unknown, string, unknown> => {
    return useMutation([MutationKeys.DELETE_USER], (id) => usersApi.deleteUser(id));
};

export const useDetailUser = (id: string) => {
    return useQuery([QueryKeys.GET_USER], () => usersApi.getDetailUser(id), {
        enabled: !!id,
    });
};
