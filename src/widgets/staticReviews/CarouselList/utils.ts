import { CoursesFiltersForm, GetCoursesInfiniteRequest } from "@entities/course";

export const adaptGetCoursesInfiniteRequest = (params: Partial<CoursesFiltersForm>): GetCoursesInfiniteRequest => {
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
