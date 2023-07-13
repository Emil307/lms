import dayjs from "dayjs";
import { TFunctionParams } from "@shared/ui/DataGrid/types";
import { AdminCoursePackagesFiltersForm, GetAdminCoursePackagesRequest } from "@entities/coursePackage";

export const adaptGetAdminCoursePackagesRequest = (
    params: TFunctionParams<AdminCoursePackagesFiltersForm>
): GetAdminCoursePackagesRequest => {
    const { createdAtFrom, createdAtTo, isActive, courseIds, discountFinishingDateFrom, discountFinishingDateTo, ...rest } = params;

    return {
        ...rest,
        filter: {
            isActive: isActive === "" ? undefined : isActive,

            ...(courseIds && {
                courseIds: {
                    items: [courseIds],
                    operator: "or",
                },
            }),

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
