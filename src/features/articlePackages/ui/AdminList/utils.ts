import dayjs from "dayjs";
import { TFunctionParams } from "@shared/ui/DataGrid/types";
import { AdminArticlePackagesFiltersForm, GetAdminArticlePackagesRequest } from "@entities/articlePackage";

export const adaptGetAdminArticlePackagesRequest = (
    params: TFunctionParams<AdminArticlePackagesFiltersForm>
): GetAdminArticlePackagesRequest => {
    const { createdAtFrom, createdAtTo, isActive, discountFinishingDate, categoryId, ...rest } = params;

    return {
        ...rest,
        filter: {
            isActive: isActive === "" ? undefined : isActive,
            categoryIds: categoryId,

            ...(createdAtFrom &&
                createdAtTo && {
                    createdAt: {
                        items: [dayjs(createdAtFrom).format("YYYY-MM-DD"), dayjs(createdAtTo).endOf("day").format()],
                        operator: "range",
                    },
                }),

            ...(discountFinishingDate && {
                "discount.finishingDate": {
                    items: [dayjs(discountFinishingDate).endOf("day").format()],
                    operator: "lte",
                },
            }),
        },
    };
};
