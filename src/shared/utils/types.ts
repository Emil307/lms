import { AxiosInstance, AxiosResponse } from "axios";
import { NextPage } from "next";
import { AppProps } from "next/app";
import { ReactNode } from "react";
import { ReactElement } from "react";
import { z } from "zod";
import { TPagination } from "@shared/types";

export type ApiHandler<Params, Response> = (params: Params) => Response;
const isProd = process.env.CLIENT_TYPE === "PROD";
export enum HTTPMethod {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE",
}
export type CreateApiMethodParams<Request, Response, PathParams = undefined, RequestOutput = Request, ResponseOutput = Response> =
    | {
          method: HTTPMethod;
          path: (params?: PathParams) => string;
          requestSchema: z.ZodType<Request, z.ZodTypeDef, RequestOutput>;
          responseSchema: z.ZodType<Response, z.ZodTypeDef, ResponseOutput>;
      }
    | {
          method: HTTPMethod;
          path: string;
          requestSchema: z.ZodType<Request, z.ZodTypeDef, RequestOutput>;
          responseSchema: z.ZodType<Response, z.ZodTypeDef, ResponseOutput>;
      };

export abstract class BaseApi {
    constructor(protected instance: AxiosInstance) {}

    createApiMethod<Request, Response, PathParams = undefined, RequestOutput = Request, ResponseOutput = Response>({
        method = HTTPMethod.GET,
        path,
        requestSchema,
        responseSchema,
    }: CreateApiMethodParams<Request, Response, PathParams, RequestOutput, ResponseOutput>): (
        data: Request,
        params?: PathParams,
    ) => Promise<Response> {
        return (requestData: Request, params?: PathParams) => {
            requestSchema.parse(requestData);
            const apiHandler = async () => {
                const url = typeof path === "string" ? path : path(params as PathParams);
                const response: AxiosResponse["data"] = await this.instance({
                    method,
                    url,
                    [method === HTTPMethod.GET ? "params" : "data"]: requestData,
                });

                if (isProd) {
                    responseSchema.safeParseAsync(response.data).then((result) => {
                        if (!result.success) {
                            console.error(result.error);
                            // TODO: Привязать Sentry;
                        }
                    });

                    return response.data as Response;
                }
                return responseSchema.parse(response);
            };

            return apiHandler();
        };
    }
}

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode;
};

export type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

export type TPaginationResponse<T> = {
    data: T;
    pagination: TPagination;
};
