import { GetAdminSubCategoriesPaginateRequest, SubCategoriesFilters } from "@entities/category";
import { TFunctionParams } from "@shared/ui/DataGrid/types";

export const adaptGetAdminSubCategoriesRequest = (params: TFunctionParams<SubCategoriesFilters>): GetAdminSubCategoriesPaginateRequest => {
    const { parentId, ...rest } = params;

    return {
        ...rest,
        filter: {
            parentId,
        },
        paginate: true,
    };
};
