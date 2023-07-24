import { useMutation } from "@tanstack/react-query";
import { setCookie } from "cookies-next";
import { useRouter } from "next/router";
import { Route } from "nextjs-routes";
import { AxiosError } from "axios";
import { MutationKeys } from "@shared/constant";
import { AuthenticateResponse, authApi } from "@entities/auth";
import { AuthFormValidationSchema } from "@features/auth";
import { ECookies } from "@app/config/axios/cookies";
import { FormErrorResponse } from "@shared/types";
import { ToastType, createNotification } from "@shared/utils";

export const useAuthenticateMe = () => {
    const router = useRouter();
    return useMutation<AuthenticateResponse, AxiosError<FormErrorResponse>, AuthFormValidationSchema>(
        [MutationKeys.AUTHENTICATE_ME],
        (data: AuthFormValidationSchema) => authApi.authMe(data),
        {
            onSuccess: (response) => {
                setCookie(ECookies.TOKEN, response.data.accessToken);
                setCookie(ECookies.TOKEN_TYPE, response.data.tokenType);
                setCookie(ECookies.USER_ROLE, response.meta.user.roles[0].id);
                if (router.query.redirect) {
                    const redirectUrl = router.query.redirect as unknown as Route;
                    router.push(redirectUrl);
                    return;
                }

                //TODO: Это временно пока не будет главной для авторизованного пользователя
                router.push("/profile");
            },
            onError: () => {
                createNotification({
                    type: ToastType.WARN,
                    title: "Ошибка аутентификации",
                });
            },
        }
    );
};
