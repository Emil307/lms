import { AxiosError, AxiosRequestHeaders } from "axios";
import Router from "next/router";
import { authApiUrl, logoutPath, notFoundPath, serverErrorPath } from "@app/routes";
import { TAxiosResponseInterceptorError, TAxiosRunWhen } from "./types";

export const defaultHeaders: Partial<AxiosRequestHeaders> = {
    Accept: "application/json",
    "Content-Type": "application/json",
};

/**
 *
 * @param config AxiosConfigObject
 * @returns true, если запрос для скачивания файлов
 */
export const whenDownloadingFiles: TAxiosRunWhen = (config) => {
    return !!config.url?.includes("payment-invoices");
};

/**
 *
 * @param config AxiosConfigObject
 * @returns true если запрос для загрузки файлов
 */
export const whenUsingUploadToStorageRoute: TAxiosRunWhen = (config) => {
    return !!config.url?.includes("storage/uploads");
};

/**
 *
 * @param config AxiosConfigObject
 * @returns true если запрос из next api routes
 */
export const whenApiRoutesRoute: TAxiosRunWhen = (config) => {
    return !!config.url?.includes("external-icons");
};

export const errorLogger: TAxiosResponseInterceptorError = (error) => console.error(error);

export const handleAxiosError: TAxiosResponseInterceptorError = async (axiosError: AxiosError) => {
    const error = axiosError;
    const errorCode = error.code;
    const isNetworkError = errorCode === "ERR_NETWORK";
    if (isNetworkError) {
        error.message = "Ошибка соединения";
        return Promise.reject(error);
    }
    const statusCode = error.response?.status;

    const isAccessError = statusCode === 403 || statusCode === 404;
    const isServerError = statusCode === 500;
    const isAuthError = statusCode === 401;
    const isExceedingError = statusCode === 429;

    if (isServerError) {
        Router.push(serverErrorPath);
        return Promise.reject(error);
    }
    //Если поймали 401 при неудачной авторизации
    if (isAuthError && error.config?.url?.includes(authApiUrl)) {
        return Promise.reject(error);
    }
    //Если поймали 403 при неудачной авторизации (пользователь есть, но неактивен)
    if (isAccessError && error.config?.url?.includes(authApiUrl)) {
        return Promise.reject(error);
    }
    if (isAccessError) {
        Router.push(notFoundPath);
        return Promise.reject(error);
    }
    if (isAuthError) {
        Router.push(logoutPath);
        return Promise.reject(error);
    }
    if (isExceedingError) {
        return Promise.reject(error);
    }

    const errorResponseData = error.response?.data;

    if (!error.response) {
        return Promise.reject(error);
    }

    if (errorResponseData instanceof Blob) {
        const preparedErrorResponseDataString = await errorResponseData.text();
        error.response.data = JSON.parse(preparedErrorResponseDataString);
    } else {
        error.response.data = errorResponseData;
    }

    return Promise.reject(error);
};
