import { useMutation } from "@tanstack/react-query";
import { setCookie } from "cookies-next";
import { useRouter } from "next/router";
import { Route } from "nextjs-routes";
import { MutationKeys } from "@shared/constant";
import { authApi } from "@entities/auth";
import { AuthData } from "@features/auth";

export const useAuthenticateMe = () => {
    const router = useRouter();
    return useMutation([MutationKeys.AUTHENTICATE_ME], (data: AuthData) => authApi.authenticateMe(data), {
        onSuccess: (response) => {
            setCookie("TOKEN", response.data.accessToken);
            if (router.query.redirect) {
                const redirectUrl = router.query.redirect as unknown as Route;
                router.push(redirectUrl);
                return;
            }

            router.push("/");
        },
    });
};
