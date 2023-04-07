import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { MutationKeys } from "@shared/constant";
import { authApi } from "@entities/auth";
import { RecoveryPasswordFormData } from "@features/auth";

export const useResetPassword = () => {
    const router = useRouter();
    return useMutation(
        [MutationKeys.CHANGE_PASSWORD],
        (data: RecoveryPasswordFormData) =>
            authApi.resetPassword({ ...data, email: String(router.query.email), token: String(router.query.token) }),
        {
            onSuccess: () => {
                router.push("/auth");
            },
        }
    );
};
