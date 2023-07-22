import { TRouterQueries } from "@shared/types";

export type TQueryParams = TRouterQueries & {
    moduleId: string;
    lessonId: string;
};
