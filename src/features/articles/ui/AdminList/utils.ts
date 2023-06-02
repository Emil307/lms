import { TFunctionParams } from "@shared/ui/DataGrid/types";
import { AdminArticlesFiltersForm, GetAdminArticlesRequest } from "@entities/article";

export const adaptGetAdminArticlesRequest = (params: TFunctionParams<AdminArticlesFiltersForm>): GetAdminArticlesRequest => {
    const { isActive, categoryId, subcategoryId, courseIds, ...rest } = params;

    return {
        ...rest,
        filter: {
            isActive: isActive === "" ? undefined : isActive,
            "category.id": categoryId,
            "subcategory.id": subcategoryId,
            courseIds,
        },
    };
};
