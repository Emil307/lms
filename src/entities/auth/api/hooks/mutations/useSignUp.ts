import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";
import { setCookie } from "cookies-next";
import { Route } from "nextjs-routes";
import { MutationKeys } from "@shared/constant";
import { authApi, SignUpRequest } from "@entities/auth";

export const useSignUp = () => {
    const router = useRouter();
    return useMutation([MutationKeys.SIGN_UP], (data: SignUpRequest) => authApi.signUp(data), {
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
