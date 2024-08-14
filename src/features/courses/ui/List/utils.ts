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

    const filter: any = {};

    if (collectionIds) {
        filter.collectionIds = collectionIds;
    }

    if (hasDiscount === "true") {
        filter.hasDiscount = true;
    }

    if (isFavorite) {
        filter.isFavorite = true;
    }

    if (isPopular) {
        filter.isPopular = true;
    }

    if (categoryId) {
        filter["category.id"] = categoryId;
    }

    if (discountPrice) {
        const formattedPrice = parseFloat(discountPrice);
        const newPrice = formattedPrice * 100;
        filter.discountPrice = {
            items: [newPrice.toString()],
            operator: "lte",
        };
    }

    if (tags && tags.length > 0) {
        filter.tagIds = {
            items: Array.isArray(tags) ? tags : [tags],
            operator: "or",
        };
    }

    if (packageIds && packageIds.length > 0) {
        filter.packageIds = {
            items: Array.isArray(packageIds) ? packageIds : [packageIds],
            operator: "or",
        };
    }

    if (subcategoryIds && subcategoryIds.length > 0) {
        filter["subcategory.id"] = {
            items: Array.isArray(subcategoryIds) ? subcategoryIds : [subcategoryIds],
            operator: "or",
        };
    }

    return {
        ...rest,
        filter,
    };
};
