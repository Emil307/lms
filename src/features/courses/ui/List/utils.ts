import { TFunctionParams } from "@shared/ui/DataGrid/types";
import { GetCoursesRequest } from "@entities/course";
import { TRouterQueries } from "./types";

export const adaptGetCoursesRequest = (params: TFunctionParams<TRouterQueries>): GetCoursesRequest => {
    const {
        tags = [],
        categoryId,
        hasDiscount,
        subcategoryIds = [],
        isFavorite,
        isPopular,
        collectionIds,
        packageIds = [],
        discountPrice,
        ...rest
    } = params;

    return {
        ...rest,
        filter: {
            collectionIds,
            ...(hasDiscount === "true" && { hasDiscount: true }),
            ...(isFavorite && { isFavorite: true }),
            ...(isPopular && { isPopular: true }),
            ...(categoryId && { "category.id": categoryId }),

            ...(discountPrice && {
                discountPrice: {
                    items: [discountPrice],
                    operator: "lte",
                },
            }),

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
