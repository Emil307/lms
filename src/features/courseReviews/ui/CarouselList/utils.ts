import { TFunctionParams } from "@shared/ui/DataGrid/types";
import { CourseReviewsFiltersForm, GetCourseReviewsRequest } from "@entities/courseReview";

export const adaptGetCourseReviewsRequest = (params: TFunctionParams<CourseReviewsFiltersForm>): GetCourseReviewsRequest => {
    const { courseId, ...rest } = params;

    return {
        ...rest,
        filter: {
            ...(courseId && {
                "course.id": courseId,
            }),
        },
    };
};
