import { getCookie } from "cookies-next";
import { TAxiosRequestInterceptorSuccess } from "@app/config/axios/types";
import { ECookies } from "@app/config/axios/cookies";
export const tokenInterceptor: TAxiosRequestInterceptorSuccess = (config) => {
    const bearerToken = getCookie(ECookies.TOKEN);
    if (!bearerToken) return config;
    config.headers["Authorization"] = `Bearer ${bearerToken}`;
    return config;
};

export const storageInterceptor: TAxiosRequestInterceptorSuccess = (config) => {
    config.headers["Content-Type"] = "multipart/form-data";
    return config;
};
