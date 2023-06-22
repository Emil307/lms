import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@shared/constant";
import { GetAdminCourseReviewResourcesResponse, courseReviewApi } from "@entities/courseReview";

export const useAdminCourseReviewsResources = () => {
    return useQuery<GetAdminCourseReviewResourcesResponse>([QueryKeys.GET_ADMIN_COURSE_REVIEW_RESOURCES], () =>
        courseReviewApi.getAdminCourseReviewsResources()
    );
};
