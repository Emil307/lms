import { TRouterQueries } from "@shared/types";

export type TRouterQueriesParams = Pick<TRouterQueries, "id"> & {
    studentId: string;
};
