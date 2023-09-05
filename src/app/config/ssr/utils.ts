import { GetServerSidePropsContext } from "next";
import Axios, { AxiosError } from "axios";
import { getCookies } from "cookies-next";
import { QueryClient } from "@tanstack/react-query";
import { logoutPath } from "@app/routes";
import { bindInterceptors } from "@app/config/axios/default";

export async function getSsrInstances(context: GetServerSidePropsContext) {
    const cookies = getCookies(context);
    const queryClient = new QueryClient();

    const authorization = `${cookies.TOKEN_TYPE} ${cookies.TOKEN}`;

    const axios = Axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_URL_CORE,
        headers: { Accept: "application/json", "Content-Type": "application/json", Authorization: authorization },
        responseType: "json",
    });

    bindInterceptors(axios);

    return { axios, queryClient };
}

export const handleAxiosErrorSsr = (errorSsr: unknown) => {
    const { response: error } = errorSsr as { response: AxiosError };

    const isNetworkError = error.code === "ERR_NETWORK";
    if (isNetworkError) {
        return {
            redirect: {
                permanent: false,
                destination: "/500",
            },
        };
    }
    const statusCode = error.status;

    const isAccessError = statusCode === 403 || statusCode === 404;
    const isUnknownError = statusCode === 500;
    const isAuthError = statusCode === 401;

    if (isUnknownError) {
        return {
            redirect: {
                permanent: false,
                destination: "/500",
            },
        };
    }
    if (isAccessError) {
        return {
            redirect: {
                permanent: false,
                destination: "/404",
            },
        };
    }

    if (isAuthError) {
        return {
            redirect: {
                permanent: false,
                destination: logoutPath,
            },
        };
    }
    return {
        redirect: {
            permanent: false,
            destination: "/500",
        },
    };
};
