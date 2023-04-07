import { useMutation } from "@tanstack/react-query";
import { MutationKeys } from "@shared/constant";
import { authApi, ChangePasswordRequest } from "@entities/auth";

export const useChangePassword = () => {
    return useMutation([MutationKeys.CHANGE_PASSWORD], (data: ChangePasswordRequest) => authApi.changePassword(data));
};
