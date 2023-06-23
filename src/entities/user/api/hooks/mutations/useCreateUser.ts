import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { CreateUserRequest, CreateUserResponse, userApi } from "@entities/user";
import { MutationKeys } from "@shared/constant";

export const useCreateUser = (): UseMutationResult<CreateUserResponse, unknown, CreateUserRequest, unknown> => {
    return useMutation([MutationKeys.CREATE_USER], (data) => userApi.createUser(data));
};
