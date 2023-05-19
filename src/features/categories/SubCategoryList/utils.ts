import { GetAdminSubCategoriesRequest, SubCategoriesFilters } from "@entities/category";
import { TFunctionParams } from "@shared/ui/DataGrid/types";

export const adaptGetAdminSubCategoriesRequest = (params: TFunctionParams<SubCategoriesFilters>): GetAdminSubCategoriesRequest => {
    const { parentId, ...rest } = params;

    return {
        ...rest,
        filter: {
            parentId,
        },
    };
};
