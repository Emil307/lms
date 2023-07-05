import dayjs from "dayjs";
import { z } from "zod";
import { TFunctionParams } from "@shared/ui/DataGrid/types";
import { AdminCoursesFiltersForm, GetAdminCoursesRequest } from "@entities/course";

export const adaptGetAdminCoursesRequest = (params: TFunctionParams<AdminCoursesFiltersForm>): GetAdminCoursesRequest => {
    const { createdAtFrom, createdAtTo, tags = [], teachers = [], discountType, isActive, category, ...rest } = params;

    return {
        ...rest,
        filter: {
            ...(z.coerce.number().safeParse(isActive).success && {
                isActive: isActive === "1",
            }),
            "discount.type": discountType,
            "category.id": category === "null" ? null : category,
            tagIds: {
                items: tags,
                operator: "or",
            },
            teacherIds: {
                items: teachers,
                operator: "or",
            },
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
