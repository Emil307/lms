import dayjs from "dayjs";
import { TFunctionParams } from "@shared/ui/DataGrid/types";
import { AdminCourseReviewFiltersForm, GetAdminCourseReviewsRequest } from "@entities/courseReview";

export const adaptGetAdminCourseReviewsRequest = (params: TFunctionParams<AdminCourseReviewFiltersForm>): GetAdminCourseReviewsRequest => {
    const { isPublished, courseId, score, createdAtFrom, createdAtTo, ...rest } = params;

    return {
        ...rest,
        filter: {
            "course.id": courseId,
            ...(isPublished && {
                isPublished: isPublished === "1",
            }),
            score: score,
            ...(createdAtFrom &&
                createdAtTo && {
                    createdAt: {
                        items: [dayjs(createdAtFrom).format("YYYY-MM-DD"), dayjs(createdAtTo).endOf("day").format()],
                        operator: "range",
                    },
                }),
        },
    };
};
