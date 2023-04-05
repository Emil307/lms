import { AxiosInstance } from "axios";
import { NextPage } from "next";
import { AppProps } from "next/app";
import { ReactNode } from "react";
import { ReactElement } from "react";
<<<<<<< HEAD
import { Pagination } from "@shared/types";
=======
>>>>>>> 36e33a51 (refactor(Общее): удалены комменты и перенесен тип пагинации в shared)

export abstract class BaseApi {
    constructor(protected instance: AxiosInstance) {}
}

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode;
};

export type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

export interface TPaginationResponse<T> {
    data: T;
    meta: {
        pagination: Pagination;
    };
}
