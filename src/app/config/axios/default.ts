import Axios, { AxiosInstance } from "axios";
import {
    defaultHeaders,
    errorLogger,
    handleAxiosError,
    whenApiRoutesRoute,
    whenDownloadingFiles,
    whenUsingUploadToStorageRoute,
} from "./helpers";
import { apiRoutesInterceptor, downloadingFileInterceptor, storageInterceptor, tokenInterceptor } from "./interceptors/request";
import { responderInterceptor } from "./interceptors/response";
import { TAxiosResponseInterceptorError } from "./types";

export const axios = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: defaultHeaders,
    responseType: "json",
});

export const bindInterceptors = (axios: AxiosInstance, handleResponseInterceptorError?: TAxiosResponseInterceptorError) => {
    /**
     *  Добавляй header token, если запрос делает пользователь личного кабинета.
     */
    axios.interceptors.request.use(tokenInterceptor, errorLogger, { runWhen: () => true });

    /**
     *  Добавляй content-type = multipart/form-data, если загружает файл.
     */
    axios.interceptors.request.use(storageInterceptor, errorLogger, { runWhen: whenUsingUploadToStorageRoute });

    /**
     *  Добавляй responseType = blob, если скачиваешь бинарный файл.
     */
    axios.interceptors.request.use(downloadingFileInterceptor, errorLogger, { runWhen: whenDownloadingFiles });

    /**
     *  Меняй baseUrl, если работаешь с API Routes.
     */
    axios.interceptors.request.use(apiRoutesInterceptor, errorLogger, { runWhen: whenApiRoutesRoute });

    axios.interceptors.response.use(responderInterceptor, handleResponseInterceptorError);
};

bindInterceptors(axios, handleAxiosError);
