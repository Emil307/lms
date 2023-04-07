import { useMutation } from "@tanstack/react-query";
import { MutationKeys } from "@shared/constant";
import { authApi, RecoveryPasswordRequest } from "@entities/auth";

export const useRecoveryPassword = () => {
    return useMutation([MutationKeys.CHANGE_PASSWORD], (data: RecoveryPasswordRequest) => authApi.recoveryPassword(data));
};
