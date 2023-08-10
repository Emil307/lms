import dayjs from "dayjs";
import { TFunctionParams } from "@shared/ui/DataGrid/types";
import { AdminArticlePackagesFiltersForm, GetAdminArticlePackagesRequest } from "@entities/articlePackage";

export const adaptGetAdminArticlePackagesRequest = (
    params: TFunctionParams<AdminArticlePackagesFiltersForm>
): GetAdminArticlePackagesRequest => {
    const { createdAtFrom, createdAtTo, isActive, discountFinishingDateFrom, discountFinishingDateTo, categoryId, ...rest } = params;

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

            ...(discountFinishingDateFrom &&
                discountFinishingDateTo && {
                    "discount.finishingDate": {
                        items: [
                            dayjs(discountFinishingDateFrom).format("YYYY-MM-DD"),
                            dayjs(discountFinishingDateTo).endOf("day").format(),
                        ],
                        operator: "range",
                    },
                }),
        },
    };
};
