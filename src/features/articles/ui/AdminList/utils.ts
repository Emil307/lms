import { z } from "zod";
import { TFunctionParams } from "@shared/ui/DataGrid/types";
import { AdminArticlesFiltersForm, GetAdminArticlesRequest } from "@entities/article";

export const adaptGetAdminArticlesRequest = (params: TFunctionParams<AdminArticlesFiltersForm>): GetAdminArticlesRequest => {
    const { isActive, categoryId, subcategoryId, courseIds, ...rest } = params;

    return {
        ...rest,
        filter: {
            ...(z.coerce.number().safeParse(isActive).success && {
                isActive: isActive === "1",
            }),
            "category.id": categoryId,
            subcategoryIds: subcategoryId,
            courseIds,
        },
    };
};
