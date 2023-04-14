import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { CreateUserRequest, UserCreateResponse, usersApi } from "@entities/user";
import { MutationKeys } from "@shared/constant";

export const useCreateUser = (): UseMutationResult<UserCreateResponse, unknown, CreateUserRequest, unknown> => {
    return useMutation([MutationKeys.CREATE_USER], (data) => usersApi.createUser(data));
};
