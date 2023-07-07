import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { MutationKeys } from "@shared/constant";
import { authApi, RecoveryPasswordRequest } from "@entities/auth";
import { createNotification, ToastType } from "@shared/utils";
import { FormErrorResponse } from "@shared/types";

export const useRecoveryPassword = () => {
    return useMutation<void, AxiosError<FormErrorResponse>, RecoveryPasswordRequest>(
        [MutationKeys.CHANGE_PASSWORD],
        (data: RecoveryPasswordRequest) => authApi.recoveryPassword(data),
        {
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
        },
    );
};
