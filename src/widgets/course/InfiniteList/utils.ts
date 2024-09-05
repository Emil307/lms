import { TFunctionParams } from "@shared/ui/DataGrid/types";
import { GetCoursesRequest } from "@entities/course";
import { TRouterQueries } from "./types";

export const adaptGetCoursesRequest = (params: TFunctionParams<TRouterQueries>): GetCoursesRequest => {
    const { tags = [], categoryId, hasDiscount, subcategoryIds = [], collectionIds, discountPrice, ...rest } = params;

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
    addFilter("category.id", categoryId);

    if (discountPrice) {
        const prices = Array.isArray(discountPrice) ? discountPrice.map(parseFloat) : [parseFloat(discountPrice)];
        if (prices.length === 1) {
            addFilter("discountPrice", {
                items: [prices[0].toString()],
                operator: "lte",
            });
        } else if (prices.length === 2) {
            addFilter("discountPrice", {
                items: [(prices[0] * 100).toString(), (prices[1] * 100).toString()],
                operator: "between",
            });
        }
    }

    addArrayFilter("tagIds", tags);
    addArrayFilter("subcategory.id", subcategoryIds);

    return {
        ...rest,
        filter,
    };
};
