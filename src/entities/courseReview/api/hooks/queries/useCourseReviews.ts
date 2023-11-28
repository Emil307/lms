import { CourseReviewFromList, GetCourseReviewsRequest, courseReviewApi } from "@entities/courseReview";
import { EntityNames, QueryKeys } from "@shared/constant";
import { useInfiniteRequest } from "@shared/utils";

export const useCourseReviews = (params: Omit<GetCourseReviewsRequest, "page">, enabled?: boolean) => {
    return useInfiniteRequest<CourseReviewFromList>(
        [QueryKeys.GET_COURSE_REVIEWS, [EntityNames.COURSE_REVIEW, EntityNames.COURSE, EntityNames.USER], params],
        ({ pageParam = 1 }) => courseReviewApi.getCourseReviews({ ...params, page: pageParam }),
        {
            enabled,
        }
    );
};
