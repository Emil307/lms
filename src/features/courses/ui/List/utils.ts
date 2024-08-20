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

    const addFilter = (key: string, value: any) => {
        if (value) {
            filter[key] = value;
        }
    };

    const addArrayFilter = (key: string, items: any[], operator: string = "or") => {
        if (items && items.length > 0) {
            filter[key] = { items: Array.isArray(items) ? items : [items], operator };
        }
    };

    addFilter("collectionIds", collectionIds);
    addFilter("hasDiscount", hasDiscount === "true" ? true : undefined);
    addFilter("isFavorite", isFavorite);
    addFilter("isPopular", isPopular);
    addFilter("category.id", categoryId);

    if (discountPrice) {
        const formattedPrice = parseFloat(discountPrice) * 100;
        addFilter("discountPrice", {
            items: [formattedPrice.toString()],
            operator: "lte",
        });
    }

    addArrayFilter("tagIds", tags);
    addArrayFilter("packageIds", packageIds);
    addArrayFilter("subcategory.id", subcategoryIds);

    return {
        ...rest,
        filter,
    };
};
