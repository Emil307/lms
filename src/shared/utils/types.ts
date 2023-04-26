import { AxiosInstance } from "axios";
import { NextPage } from "next";
import { AppProps } from "next/app";
import { ReactNode } from "react";
import { ReactElement } from "react";
import { TPagination } from "@shared/types";

export abstract class BaseApi {
    constructor(protected instance: AxiosInstance) {}
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
