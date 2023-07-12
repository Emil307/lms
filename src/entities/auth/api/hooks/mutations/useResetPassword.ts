import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { AxiosError } from "axios";
import { MutationKeys } from "@shared/constant";
import { ResetPasswordResponse, authApi } from "@entities/auth";
import { RecoveryPasswordFormData } from "@features/auth";
import { ToastType, createNotification } from "@shared/utils";
import { FormErrorResponse } from "@shared/types";

export const useResetPassword = () => {
    const router = useRouter();
    return useMutation<ResetPasswordResponse, AxiosError<FormErrorResponse>, RecoveryPasswordFormData>(
        [MutationKeys.CHANGE_PASSWORD],
        (data: RecoveryPasswordFormData) =>
            authApi.resetPassword({ ...data, email: String(router.query.email), token: String(router.query.token) }),
        {
            onSuccess: () => {
                createNotification({
                    type: ToastType.SUCCESS,
                    title: "Изменения сохранены",
                });
                router.push("/auth");
            },
            onError: () => {
                createNotification({
                    type: ToastType.WARN,
                    title: "Ошибка восстановления пароля",
                });
            },
        }
    );
};
