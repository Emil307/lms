import { TAxiosResponseInterceptorSuccess, TFileDownloadResponse } from "../../types";

export const responderInterceptor: TAxiosResponseInterceptorSuccess = (response) => {
    if (response.config.responseType === "blob") {
        const filename = response.headers["content-disposition"].split("=")[1].replaceAll('"', "");
        return { data: response.data, filename } as TFileDownloadResponse;
    }

    try {
        const responseObject = response.data;
        let data = {};
        if (responseObject.pagination) {
            data = { pagination: responseObject.pagination };
        }
        if (responseObject.meta) {
            data = { ...data, meta: responseObject.meta };
        }
        if (Object.keys(data).length) {
            return { data: responseObject.data, ...data };
        }
        if (Object.keys(responseObject).length > 3) {
            const { data, success, status, ...rest } = responseObject;
            return { data: responseObject.data, ...rest };
        }
        return responseObject;
    } catch (error: unknown) {
        console.error("Response Interceptor", error);
        return response;
    }
};
