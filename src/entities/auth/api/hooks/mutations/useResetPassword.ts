import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { AxiosError } from "axios";
import { MutationKeys } from "@shared/constant";
import { ResetPasswordResponse, authApi } from "@entities/auth";
import { RecoveryPasswordFormData } from "@features/auth";
import { ToastType, createNotification } from "@shared/utils";
import { FormErrorResponse } from "@shared/types";

export const useResetPassword = (): UseMutationResult<ResetPasswordResponse, AxiosError<FormErrorResponse>, RecoveryPasswordFormData> => {
    const router = useRouter();
    return useMutation([MutationKeys.CHANGE_PASSWORD], (data: RecoveryPasswordFormData) => authApi.resetPassword(data), {
        onSuccess: () => {
            createNotification({
                type: ToastType.SUCCESS,
                title: "Изменения сохранены",
            });
            router.push({
                pathname: "/",
                query: { action: "auth" },
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
