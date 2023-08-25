import { GetServerSidePropsContext } from "next";
import Axios, { AxiosError } from "axios";
import { getCookies } from "cookies-next";
import { QueryClient } from "@tanstack/react-query";
import { logoutPath } from "@app/routes";
import { getInterceptors } from "../axios/default";
import { TAxiosResponseInterceptorError } from "../axios/types";

export async function getSsrInstances(context: GetServerSidePropsContext) {
    const cookies = getCookies(context);
    const queryClient = new QueryClient();

    const authorization = `${cookies.TOKEN_TYPE} ${cookies.TOKEN}`;

    const axios = Axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_URL_CORE,
        headers: { Accept: "application/json", "Content-Type": "application/json", Authorization: authorization },
        responseType: "json",
    });

    const handleAxiosError: TAxiosResponseInterceptorError = (error: AxiosError) => {
        const errorCode = error.code;
        const isNetworkError = errorCode === "ERR_NETWORK";
        if (isNetworkError) {
            error.message = "Ошибка соединения";
            return Promise.reject(error);
        }
        const statusCode = error.response?.status;

        const isAccessError = statusCode === 403 || statusCode === 404;
        const isUnknownError = statusCode === 500;
        const isAuthError = statusCode === 401;

        if (isUnknownError) {
            context.res.writeHead(500);
            return Promise.reject(error);
        }
        if (isAccessError) {
            context.res.writeHead(404, { location: "/404" });
            return Promise.reject(error);
        }

        if (isAuthError) {
            context.res.writeHead(401, { location: logoutPath });
            return Promise.reject(error);
        }
        return Promise.reject(error);
    };

    getInterceptors(axios, handleAxiosError);

    return { axios, queryClient };
}
