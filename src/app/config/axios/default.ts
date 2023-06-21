import Axios from "axios";
import {
    defaultHeaders,
    errorLogger,
    handleAxiosError,
    whenArticlesMicroserviceRoute,
    whenAuthMicroserviceRoute,
    whenCoursesMicroserviceRoute,
    whenUsingUploadToStorageRoute,
} from "./helpers";
import {
    articlesMicroserviceInterceptor,
    authMicroserviceInterceptor,
    coursesMicroserviceInterceptor,
    storageInterceptor,
    tokenInterceptor,
} from "./interceptors/request";
import { responderInterceptor } from "./interceptors/response";

export const axios = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL_CORE,
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
 *  Меняй baseUrl, если работаешь с микросервисом AUTH.
 */
axios.interceptors.request.use(authMicroserviceInterceptor, errorLogger, { runWhen: whenAuthMicroserviceRoute });

/**
 *  Меняй baseUrl, если работаешь с микросервисом COURSES.
 */
axios.interceptors.request.use(coursesMicroserviceInterceptor, errorLogger, { runWhen: whenCoursesMicroserviceRoute });

/**
 *  Меняй baseUrl, если работаешь с микросервисом ARTICLES.
 */
axios.interceptors.request.use(articlesMicroserviceInterceptor, errorLogger, { runWhen: whenArticlesMicroserviceRoute });

axios.interceptors.response.use(responderInterceptor, handleAxiosError);
