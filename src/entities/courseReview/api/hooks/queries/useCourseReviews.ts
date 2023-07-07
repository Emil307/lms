import { CourseReviewFromList, GetCourseReviewsRequest, courseReviewApi } from "@entities/courseReview";
import { QueryKeys } from "@shared/constant";
import { useInfiniteRequest } from "@shared/utils";

export const useCourseReviews = (params: Omit<GetCourseReviewsRequest, "page">, enabled?: boolean) => {
    return useInfiniteRequest<CourseReviewFromList>(
        [QueryKeys.GET_COURSE_REVIEWS, params],
        ({ pageParam = 1 }) => courseReviewApi.getCourseReviews({ ...params, page: pageParam }),
        {
            enabled,
        }
    );
};
