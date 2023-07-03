import { AdminSubCategoriesExtraFilters, GetAdminSubCategoriesRequest } from "@entities/category";
import { TFunctionParams } from "@shared/ui/DataGrid/types";

export const adaptGetAdminSubCategoriesRequest = (
    params: TFunctionParams<unknown, AdminSubCategoriesExtraFilters>
): GetAdminSubCategoriesRequest => {
    const { parentId, ...rest } = params;

    return {
        ...rest,
        filter: {
            parentId,
        },
    };
};
