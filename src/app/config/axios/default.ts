import Axios from "axios";
import {
    defaultHeaders,
    errorLogger,
    handleAxiosError,
    whenArticlesRoute,
    whenCoursesRoute,
    whenUsingUploadToStorageRoute,
} from "./helpers";
import { articlesInterceptor, authorsInterceptor, storageInterceptor, tokenInterceptor } from "./interceptors/request";
import { responderInterceptor } from "./interceptors/response";

export const axios = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: defaultHeaders,
    responseType: "json",
});

/**
 *  Добавляй header token, если запрос делает пользователь личного кабинета.
 */
axios.interceptors.request.use(tokenInterceptor, errorLogger, { runWhen: () => true });

/**
 *  Добавляй content-type = multipart/form-data, если загружает файл.
 */
axios.interceptors.request.use(storageInterceptor, errorLogger, { runWhen: whenUsingUploadToStorageRoute });

/**
 *  Меняй baseUrl, если работаешь с микрачом COURSES.
 */
axios.interceptors.request.use(authorsInterceptor, errorLogger, { runWhen: whenCoursesRoute });

/**
 *  Меняй baseUrl, если работаешь с микрачом ARTICLES.
 */
axios.interceptors.request.use(articlesInterceptor, errorLogger, { runWhen: whenArticlesRoute });

axios.interceptors.response.use(responderInterceptor, handleAxiosError);
