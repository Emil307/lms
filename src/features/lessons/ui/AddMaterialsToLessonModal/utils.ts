import dayjs from "dayjs";
import { TFunctionParams } from "@shared/ui/DataGrid/types";
import {
    AdminMaterialsNoIncludedLessonExtraFilters,
    AdminMaterialsNoIncludedLessonFiltersForm,
    GetAdminMaterialsNoIncludedLessonRequest,
} from "@entities/storage";

export const adaptGetMaterialsNoIncludedLessonRequest = (
    params: TFunctionParams<AdminMaterialsNoIncludedLessonFiltersForm, AdminMaterialsNoIncludedLessonExtraFilters>
): GetAdminMaterialsNoIncludedLessonRequest => {
    const { categoryIds, type, createdAtFrom, createdAtTo, lessonId, ...rest } = params;

    return {
        ...rest,
        filter: {
            categoryIds,
            "type.type": type,
            lessonIds: {
                items: [lessonId],
                operator: "not",
            },
            ...(createdAtFrom &&
                createdAtTo && {
                    createdAt: {
                        items: [dayjs(createdAtFrom).format("YYYY-MM-DD"), dayjs(createdAtTo).format("YYYY-MM-DD")],
                        operator: "range",
                    },
                }),
        },
    };
};
