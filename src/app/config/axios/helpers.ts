import { AxiosError, AxiosRequestHeaders } from "axios";
import Router from "next/router";
import { authPath, logoutPath, notFoundPath, serverErrorPath } from "@app/routes";
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
 * @returns true если запрос из next api routes
 */
export const whenApiRoutesRoute: TAxiosRunWhen = (config) => {
    return !!config.url?.includes("external-icons");
};

/**
 *
 * @param config AxiosConfigObject
 * @returns true если запрос из микросервиса AUTH
 */
export const whenAuthMicroserviceRoute: TAxiosRunWhen = (config) => {
    return (
        !!config.url?.startsWith("authentication") ||
        !!config.url?.startsWith("authorization") ||
        (!!config.url?.startsWith("me") && !config.url.startsWith("me/articles")) ||
        (!!config.url?.startsWith("admin/users") &&
            !config.url.includes("courses") &&
            !config.url.includes("groups") &&
            !config.url.includes("article-packages")) ||
        (!!config.url?.startsWith("notifications") &&
            !config.url.includes("read-all") &&
            !config.url.includes("list") &&
            !config.url.includes("new"))
    );
};

/**
 *
 * @param config AxiosConfigObject
 * @returns true если запрос из микросервиса COURSES
 */
export const whenCoursesMicroserviceRoute: TAxiosRunWhen = (config) => {
    return (
        !!config.url?.startsWith("admin/authors") ||
        !!config.url?.startsWith("authors") ||
        (!!config.url?.startsWith("admin/courses") && !config.url.includes("articles")) ||
        (!!config.url?.startsWith("courses") && !config.url.includes("articles")) ||
        !!config.url?.startsWith("admin/course-packages") ||
        !!config.url?.startsWith("course-packages") ||
        !!config.url?.startsWith("admin/course-collections") ||
        !!config.url?.startsWith("course-collections") ||
        !!config.url?.startsWith("admin/groups") ||
        !!config.url?.startsWith("groups") ||
        !!config.url?.startsWith("admin/lessons") ||
        !!config.url?.startsWith("admin/course-reviews") ||
        !!config.url?.startsWith("course-reviews") ||
        (!!config.url?.startsWith("admin/users") && config.url.includes("courses")) ||
        (!!config.url?.startsWith("admin/users") && config.url.includes("groups")) ||
        !!config.url?.startsWith("user/courses")
    );
};

/**
 *
 * @param config AxiosConfigObject
 * @returns true если запрос из микросервиса ARTICLES
 */
export const whenArticlesMicroserviceRoute: TAxiosRunWhen = (config) => {
    return (
        !!config.url?.startsWith("admin/articles") ||
        !!config.url?.startsWith("articles") ||
        !!config.url?.startsWith("admin/article-packages") ||
        (!!config.url?.startsWith("category") && config.url.includes("article")) ||
        (!!config.url?.startsWith("courses") && config.url.includes("articles")) ||
        (!!config.url?.startsWith("admin/courses") && config.url.includes("articles")) ||
        (!!config.url?.startsWith("admin/users") && config.url.includes("article-packages")) ||
        !!config.url?.startsWith("me/articles") ||
        !!config.url?.includes("article-packages")
    );
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
    const isServerError = statusCode === 500;
    const isAuthError = statusCode === 401;

    if (isServerError) {
        Router.replace(serverErrorPath);
        return Promise.reject(error);
    }
    if (isAccessError) {
        Router.replace(notFoundPath);
        return Promise.reject(error);
    }
    if (isAuthError && window.location.pathname === authPath) {
        return Promise.reject(error);
    }
    if (isAuthError) {
        Router.replace(logoutPath);
        return Promise.reject(error);
    }
    return Promise.reject(error);
};
