import dayjs from "dayjs";
import { z } from "zod";
import { TFunctionParams } from "@shared/ui/DataGrid/types";
import { AdminCourseCollectionsFiltersForm, GetAdminCourseCollectionsRequest } from "@entities/courseCollection";

export const adaptGetAdminCourseCollectionsRequest = (
    params: TFunctionParams<AdminCourseCollectionsFiltersForm>,
): GetAdminCourseCollectionsRequest => {
    const { createdAtFrom, createdAtTo, isActive, courseId, ...rest } = params;

    return {
        ...rest,
        filter: {
            ...(z.coerce.number().safeParse(isActive).success && {
                isActive: isActive === "1",
            }),
            ...(courseId && {
                courseIds: {
                    items: [courseId],
                    operator: "or",
                },
            }),
            ...(createdAtFrom &&
                createdAtTo && {
                    createdAt: {
                        items: [dayjs(createdAtFrom).format("YYYY-MM-DD"), dayjs(createdAtTo).endOf("day").format()],
                        operator: "range",
                    },
                }),
        },
    };
};
