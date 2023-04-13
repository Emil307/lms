import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { CreateUserRequest, UserCreateResponse, usersApi } from "@entities/user";

export const useCreateUser = (): UseMutationResult<UserCreateResponse, unknown, CreateUserRequest, unknown> => {
    return useMutation(["CREATE_USER"], (data) => usersApi.createUser(data));
};
