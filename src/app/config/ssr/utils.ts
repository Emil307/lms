import { GetServerSidePropsContext } from "next";
import Axios, { AxiosError } from "axios";
import { getCookies } from "cookies-next";
import { QueryClient } from "@tanstack/react-query";
import { logoutPath } from "@app/routes";
import { bindInterceptors } from "@app/config/axios/default";
import { REQUEST_TIMEOUT } from "./constants";

export function getSsrInstances(context: GetServerSidePropsContext) {
    const cookies = getCookies(context);
    const queryClient = new QueryClient();

    const authorization = `${cookies.TOKEN_TYPE} ${cookies.TOKEN}`;

    const axios = Axios.create({
        baseURL: process.env.SERVER_API_URL,
        headers: { Accept: "application/json", "Content-Type": "application/json", Authorization: authorization },
        responseType: "json",
        timeout: REQUEST_TIMEOUT,
    });

    bindInterceptors(axios);

    return { axios, queryClient };
}

export const handleAxiosErrorSsr = (errorSsr: unknown) => {
    const { response: error } = errorSsr as { response: AxiosError | undefined };

    const isNetworkError = error?.code === "ERR_NETWORK";

    if (isNetworkError) {
        return {
            redirect: {
                permanent: false,
                destination: "/500",
            },
        };
    }

    const statusCode = error?.status || 500;
    const isAccessError = statusCode === 403 || statusCode === 404;
    const isAuthError = statusCode === 401;

    if (isAccessError) {
        return {
            notFound: true,
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
