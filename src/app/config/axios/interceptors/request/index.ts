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

export const apiRoutesInterceptor: TAxiosRequestInterceptorSuccess = (config) => {
    config.baseURL = process.env.NEXT_PUBLIC_API_ROUTES_URL;
    return config;
};

export const authMicroserviceInterceptor: TAxiosRequestInterceptorSuccess = (config) => {
    config.baseURL = process.env.NEXT_PUBLIC_API_URL_AUTH;
    return config;
};

export const coursesMicroserviceInterceptor: TAxiosRequestInterceptorSuccess = (config) => {
    config.baseURL = process.env.NEXT_PUBLIC_API_URL_COURSES;
    return config;
};

export const articlesMicroserviceInterceptor: TAxiosRequestInterceptorSuccess = (config) => {
    config.baseURL = process.env.NEXT_PUBLIC_API_URL_ARTICLES;
    return config;
};
