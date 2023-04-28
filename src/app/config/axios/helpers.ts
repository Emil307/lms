import { AxiosError, AxiosRequestHeaders } from "axios";
import Router from "next/router";
import { TAxiosResponseInterceptorError, TAxiosRunWhen } from "./types";

export const defaultHeaders: Partial<AxiosRequestHeaders> = {
    Accept: "application/json",
    "Content-Type": "application/json",
};

/**
 *
 * @param config AxiosConfigObject
 * @returns true если запрос идет на урл не содержащий admin в URL, false иначе.
 */
export const whenUsingLkRoute: TAxiosRunWhen = (config) => {
    return config.url?.includes("admin") || false;
};

/**
 *
 * @param config AxiosConfigObject
 * @returns true, если responseType === blob
 */
export const whenDownloadingFiles: TAxiosRunWhen = (config) => {
    return config.responseType === "blob";
};

/**
 *
 * @param config AxiosConfigObject
 * @returns true если запрос для загрузки файлов
 */
export const whenUsingUploadToStorageRoute: TAxiosRunWhen = (config) => {
    return !!config.url?.includes("storage/uploads/");
};

/**
 *
 * @param config AxiosConfigObject
 * @returns true если запрос из микроча COURSES
 */
export const whenAuthorsRoute: TAxiosRunWhen = (config) => {
    return !!config.url?.includes("authors");
};

/**
 *
 * @param config AxiosConfigObject
 * @returns true если запрос из микроча ARTICLES
 */
export const whenArticlesRoute: TAxiosRunWhen = (config) => {
    return !!config.url?.includes("articles") || !!config.url?.includes("admin/articles") || !!config.url?.includes("article-packages");
};

export const errorLogger: TAxiosResponseInterceptorError = (error) => console.error(error);

export const handleAxiosError: TAxiosResponseInterceptorError = (error: AxiosError) => {
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
    const requestMethod = error.config?.method;
    if (isUnknownError) {
        return Promise.reject(error);
    }
    if (isAccessError && requestMethod === "get") {
        Router.replace("/404");
        return Promise.reject(error);
    }
    if (isAccessError && requestMethod !== "get") {
        return Promise.reject(error);
    }
    if (isAuthError && (window.location.pathname.split("/")[1] === "auth" || window.location.pathname === "/")) {
        return Promise.reject(error);
    }
    if (isAuthError) {
        window.location.href = "/logout";
        return Promise.reject(error);
    }
    return Promise.reject(error);
};
