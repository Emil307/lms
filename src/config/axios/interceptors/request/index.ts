import { getCookie } from "cookies-next";
import { TAxiosRequestInterceptorSuccess } from "src/config/axios/types";
import { ECookies } from "src/config/axios/cookies";

export const tokenInterceptor: TAxiosRequestInterceptorSuccess = (config) => {
    const bearerToken = getCookie(ECookies.TOKEN);
    if (!bearerToken) return config;
    config.headers["Authorization"] = `Bearer ${bearerToken}`;
    return config;
};
