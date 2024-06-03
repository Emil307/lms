import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { setCookie } from "cookies-next";
import { useRouter } from "next/router";
import { Route } from "nextjs-routes";
import { AxiosError } from "axios";
import { EntityNames, MutationKeys } from "@shared/constant";
import { AuthenticateResponse, authApi } from "@entities/auth";
import { AuthFormValidationSchema } from "@features/auth";
import { ECookies } from "@app/config/axios/cookies";
import { FormErrorResponse } from "@shared/types";
import { ToastType, createNotification, invalidateQueriesWithPredicate } from "@shared/utils";
import { getStartPage } from "@app/routes";

interface UseAuthenticateMeProps {
    skipRedirect: boolean;
}

export const useAuthenticateMe = ({
    skipRedirect,
}: UseAuthenticateMeProps): UseMutationResult<AuthenticateResponse, AxiosError<FormErrorResponse>, AuthFormValidationSchema> => {
    const router = useRouter();
    return useMutation([MutationKeys.AUTHENTICATE_ME], (data: AuthFormValidationSchema) => authApi.authMe(data), {
        onSuccess: async (response) => {
            setCookie(ECookies.TOKEN, response.data.accessToken);
            setCookie(ECookies.TOKEN_TYPE, response.data.tokenType);
            const userRole = response.meta.user.roles[0].id;
            setCookie(ECookies.USER_ROLE, userRole);

            if (skipRedirect) {
                return;
            }

            if (router.query.redirect) {
                const redirectUrl = router.query.redirect as unknown as Route;
                await router.replace(redirectUrl);
            } else {
                await router.replace(getStartPage(userRole));
            }

            invalidateQueriesWithPredicate({ entityName: EntityNames.AUTH });
        },
        onError: (error) => {
            if (error.response?.status === 401) {
                return createNotification({
                    type: ToastType.WARN,
                    title: "Неверно указан Email или пароль",
                });
            }
            if (error.response?.status === 403) {
                return createNotification({
                    type: ToastType.WARN,
                    title: "Данный пользователь неактивен",
                });
            }
            createNotification({
                type: ToastType.WARN,
                title: "Ошибка аутентификации",
            });
        },
    });
};
