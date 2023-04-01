import { AxiosInstance } from "axios";
import { NextPage } from "next";
import { AppProps } from "next/app";
import { ReactNode } from "react";
import { ReactElement } from "react";
import { z } from "zod";

export abstract class BaseApi {
    constructor(protected instance: AxiosInstance) {}
}

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode;
};

export type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

export interface FormErrorResponse {
    message: string;
    errors: {
        [key: string]: string[];
    };
}

export interface TPaginationResponse<T> {
    data: T;
    meta: {
        pagination: Pagination;
    };
}

export type Pagination = z.infer<typeof $pagination>;

export const $pagination = z.object({
    count: z.number(),
    currentPage: z.number(),
    links: z.object({
        next: z.string(),
        previous: z.string(),
    }),
    perPage: z.number(),
    total: z.number(),
    totalPages: z.number(),
});
