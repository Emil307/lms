import { TFunctionParams } from "@shared/ui/DataGrid/types";
import { GetCoursesRequest } from "@entities/course";
import { TRouterQueries } from "./types";

export const adaptGetCoursesRequest = (params: TFunctionParams<TRouterQueries>): GetCoursesRequest => {
    const { tags = [], categoryId, hasDiscount, subcategoryIds = [], isFavorite, collectionIds, packageIds = [], ...rest } = params;

    return {
        ...rest,
        filter: {
            ...(hasDiscount === "true" && { hasDiscount: true }),
            collectionIds,
            ...(categoryId && { "category.id": categoryId }),

            tagIds: {
                items: Array.isArray(tags) ? tags : [tags],
                operator: "or",
            },

            packageIds: {
                items: Array.isArray(packageIds) ? packageIds : [packageIds],
                operator: "or",
            },

            "subcategory.id": {
                items: Array.isArray(subcategoryIds) ? subcategoryIds : [subcategoryIds],
                operator: "or",
            },
        },
    };
};
