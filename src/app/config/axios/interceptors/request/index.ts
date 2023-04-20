import { getCookie } from "cookies-next";
import { TAxiosRequestInterceptorSuccess } from "@app/config/axios/types";
import { ECookies } from "@app/config/axios/cookies";
export const tokenInterceptor: TAxiosRequestInterceptorSuccess = (config) => {
    const token = getCookie(ECookies.TOKEN);
    const tokenType = getCookie(ECookies.TOKEN_TYPE);
    if (!token || !tokenType) return config;
    config.headers["Authorization"] = `${tokenType} ${token}`;
    return config;
};

export const storageInterceptor: TAxiosRequestInterceptorSuccess = (config) => {
    config.headers["Content-Type"] = "multipart/form-data";
    return config;
};

export const authorsInterceptor: TAxiosRequestInterceptorSuccess = (config) => {
    config.baseURL = process.env.NEXT_PUBLIC_API_URL_COURSES;
    return config;
};
