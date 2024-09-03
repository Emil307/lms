import { useEffect } from "react";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/router";
import { ECookies } from "@app/config/axios/cookies";
import { queryClient } from "@app/providers";
import { COOKIE_PANEL_LOCAL_STORAGE_KEY } from "@entities/auth";

const Logout = () => {
    const router = useRouter();

    useEffect(() => {
        if (!router.isReady) return;

        deleteCookie(ECookies.TOKEN);
        deleteCookie(ECookies.TOKEN_TYPE);
        deleteCookie(ECookies.USER_ROLE);

        const cookiePanel = localStorage.getItem(COOKIE_PANEL_LOCAL_STORAGE_KEY);
        localStorage.clear();

        if (cookiePanel) {
            localStorage.setItem(COOKIE_PANEL_LOCAL_STORAGE_KEY, "true");
        }

        sessionStorage.clear();

        // куки удаляются дольше, нежели очистка кэшей React Query, поэтому обернут в SetTimeout,
        // дабы избежать лишнего запроса на получение данных пользователя при логауте
        setTimeout(() => {
            queryClient.clear();
        });

        router.replace({ pathname: "/", query: router.query });
    }, [router.isReady]);

    return null;
};

export default Logout;
