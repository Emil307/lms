import { TRouterQueries } from "@shared/types";
import { AdminLesson } from "@entities/lesson";

export type TQueryParams = TRouterQueries & {
    moduleId: string;
    lessonId: string;
};

export type TLessonInfoCard = AdminLesson & {
    moduleName?: string;
};
