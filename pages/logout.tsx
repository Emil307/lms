import { useEffect } from "react";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/router";
import { ECookies } from "@app/config/axios/cookies";
import { queryClient } from "@app/providers";
import { authPath } from "@app/routes";

const Logout = () => {
    const router = useRouter();

    useEffect(() => {
        if (!router.isReady) return;
        deleteCookie(ECookies.TOKEN);
        deleteCookie(ECookies.TOKEN_TYPE);
        deleteCookie(ECookies.USER_ROLE);
        localStorage.clear();
        sessionStorage.clear();

        // куки удаляются дольше, нежели очистка кэшей React Query, поэтому обернут в SetTimeout,
        // дабы избежать лишнего запроса на получение данных пользователя при логауте
        setTimeout(() => {
            queryClient.clear();
        })

        router.replace({ pathname: authPath, query: router.query })

    }, [router.isReady]);

    return null;
};

export default Logout;
