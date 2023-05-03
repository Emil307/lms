import { useEffect } from "react";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/router";
import { ECookies } from "@app/config/axios/cookies";
import { queryClient } from "@app/providers";

const Logout = () => {
    const router = useRouter();

    useEffect(() => {
        if (!router.isReady) return;
        deleteCookie(ECookies.TOKEN);
        deleteCookie(ECookies.TOKEN_TYPE);
        queryClient.clear();
        localStorage.clear();
        sessionStorage.clear();

        router.push("/auth");
    }, [router.isReady]);

    return null;
};

export default Logout;
