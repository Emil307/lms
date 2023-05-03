import { useMutation } from "@tanstack/react-query";
import { setCookie } from "cookies-next";
import { useRouter } from "next/router";
import { Route } from "nextjs-routes";
import { MutationKeys } from "@shared/constant";
import { authApi } from "@entities/auth";
import { AuthData } from "@features/auth";
import { ECookies } from "@app/config/axios/cookies";

export const useAuthenticateMe = () => {
    const router = useRouter();
    return useMutation([MutationKeys.AUTHENTICATE_ME], (data: AuthData) => authApi.authenticateMe(data), {
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
    });
};
