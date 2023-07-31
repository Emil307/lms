import { CoursesFiltersForm, GetCoursesRequest } from "@entities/course";
import { TFunctionParams } from "@shared/ui/DataGrid/types";

export const adaptGetCoursesInfiniteRequest = (params: TFunctionParams<CoursesFiltersForm>): GetCoursesRequest => {
    const { tags = [], categoryId, hasDiscount, subcategoryIds = [], isFavorite, collectionIds, packageIds = [], ...rest } = params;

    return {
        ...rest,
        filter: {
            hasDiscount: hasDiscount,
            "category.id": categoryId,
            "subcategory.id": {
                items: subcategoryIds,
                operator: "or",
            },
            collectionIds,
            tagIds: {
                items: tags,
                operator: "or",
            },
            packageIds: {
                items: packageIds,
                operator: "or",
            },
        },
    };
};
