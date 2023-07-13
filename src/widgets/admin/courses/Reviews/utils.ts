import dayjs from "dayjs";
import { TFunctionParams } from "@shared/ui/DataGrid/types";
import { GetAdminCourseReviewsRequest } from "@entities/courseReview";
import { AdminCourseReviewsExtraParams, AdminCourseReviewsFiltersForm } from "./types";

export const adaptGetAdminCourseReviewsRequest = (
    params: TFunctionParams<AdminCourseReviewsFiltersForm, AdminCourseReviewsExtraParams>
): GetAdminCourseReviewsRequest => {
    const { isPublished, courseId, score, createdAtFrom, createdAtTo, ...rest } = params;

    return {
        ...rest,
        filter: {
            ...(isPublished && {
                isPublished: isPublished === "1",
            }),
            courseId: courseId,
            score: score,
            ...(createdAtFrom &&
                createdAtTo && {
                    createdAt: {
                        items: [dayjs(createdAtFrom).format("YYYY-MM-DD"), dayjs(createdAtTo).format("YYYY-MM-DD")],
                        operator: "range",
                    },
                }),
        },
    };
};
