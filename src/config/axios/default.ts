import Axios from "axios";
import { defaultHeaders, errorLogger } from "./helpers";
import { tokenInterceptor } from "./interceptors/request";
// import { responderInterceptor } from "./interceptors/response";

export const axios = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: defaultHeaders,
    responseType: "json",
});

/**
 *  Добавляй header token, если запрос делает пользователь личного кабинета.
 */
axios.interceptors.request.use(tokenInterceptor, errorLogger, { runWhen: () => true });

// axios.interceptors.response.use(responderInterceptor, handleAxiosError);
