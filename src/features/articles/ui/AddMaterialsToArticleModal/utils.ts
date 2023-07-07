import dayjs from "dayjs";
import { TFunctionParams } from "@shared/ui/DataGrid/types";
import {
    AdminArticleMaterialsExtraFilters,
    AdminMaterialsNoIncludedArticleFiltersForm,
    GetAdminMaterialsNoIncludedArticleRequest,
} from "@entities/storage";

export const adaptGetMaterialsRequest = (
    params: TFunctionParams<AdminMaterialsNoIncludedArticleFiltersForm, AdminArticleMaterialsExtraFilters>,
): GetAdminMaterialsNoIncludedArticleRequest => {
    const { categoryIds, type, createdAtFrom, createdAtTo, articleId, ...rest } = params;

    return {
        ...rest,
        filter: {
            categoryIds,
            "type.type": type,
            ...(articleId && {
                articleIds: {
                    items: [articleId],
                    operator: "not",
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
