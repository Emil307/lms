import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";
import { setCookie } from "cookies-next";
import { Route } from "nextjs-routes";
import { MutationKeys } from "@shared/constant";
import { authApi, SignUpRequest } from "@entities/auth";
import { ECookies } from "@app/config/axios/cookies";

export const useSignUp = () => {
    const router = useRouter();
    return useMutation([MutationKeys.SIGN_UP], (data: SignUpRequest) => authApi.signUp(data), {
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
