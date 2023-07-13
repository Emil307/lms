import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";
import { setCookie } from "cookies-next";
import { Route } from "nextjs-routes";
import { AxiosError } from "axios";
import { MutationKeys } from "@shared/constant";
import { authApi, SignUpRequest, SignUpResponse } from "@entities/auth";
import { ECookies } from "@app/config/axios/cookies";
import { createNotification, ToastType } from "@shared/utils";
import { FormErrorResponse } from "@shared/types";

export const useSignUp = () => {
    const router = useRouter();
    return useMutation<SignUpResponse, AxiosError<FormErrorResponse>, SignUpRequest>(
        [MutationKeys.SIGN_UP],
        (data: SignUpRequest) => authApi.signUp(data),
        {
            onSuccess: (response) => {
                setCookie(ECookies.TOKEN, response.data.accessToken);
                setCookie(ECookies.TOKEN_TYPE, response.data.tokenType);
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
                    title: "Ошибка регистрации",
                });
            },
        }
    );
};
