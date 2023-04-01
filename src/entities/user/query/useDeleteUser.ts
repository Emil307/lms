import { useMutation, UseMutationResult, useQuery } from "@tanstack/react-query";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { usersApi } from "../api";
import { UserCreateRequest } from "../api/types";

export const useDeleteUser = (): UseMutationResult<unknown, unknown, string, unknown> => {
    return useMutation([MutationKeys.DELETE_USER], (id) => usersApi.deleteUser(id));
};

export const useDetailUser = (id: string) => {
    return useQuery([QueryKeys.GET_USER, id], () => usersApi.getDetailUser(id), {
        enabled: !!id,
    });
};

export const useCreateUser = (): UseMutationResult<unknown, unknown, UserCreateRequest, unknown> => {
    return useMutation(["CREATE_USER"], (data) => usersApi.createUser(data));
};
