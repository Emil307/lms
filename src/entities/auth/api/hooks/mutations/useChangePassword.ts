import { useMutation } from "@tanstack/react-query";
import { MutationKeys } from "@shared/api/keys";
import { authApi, ChangePasswordRequest } from "@entities/auth";

export const useChangePassword = () => {
    return useMutation([MutationKeys.CHANGE_PASSWORD], (data: ChangePasswordRequest) => {
        return authApi.changePassword(data);
    });
};
