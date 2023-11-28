import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { MutationKeys } from "@shared/constant";
import { authApi, RecoveryPasswordRequest, RecoveryPasswordResponse } from "@entities/auth";
import { createNotification, ToastType } from "@shared/utils";
import { FormErrorResponse } from "@shared/types";

export const useRecoveryPassword = (): UseMutationResult<
    RecoveryPasswordResponse,
    AxiosError<FormErrorResponse>,
    RecoveryPasswordRequest
> => {
    return useMutation([MutationKeys.CHANGE_PASSWORD], (data) => authApi.recoveryPassword(data), {
        onSuccess: () => {
            createNotification({
                type: ToastType.SUCCESS,
                title: "Восстановление пароля",
                message: "Письмо отправлено на указанный email",
            });
        },
        onError: () => {
            createNotification({
                type: ToastType.WARN,
                title: "Ошибка восстановления пароля",
            });
        },
    });
};
