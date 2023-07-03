import { AdminCategoriesFiltersForm, GetAdminCategoriesRequest } from "@entities/category";
import { TFunctionParams } from "@shared/ui/DataGrid/types";

export const adaptGetAdminCategoriesRequest = (params: TFunctionParams<AdminCategoriesFiltersForm>): GetAdminCategoriesRequest => {
    return {
        ...params,
        filter: {
            hasParent: false,
        },
    };
};
