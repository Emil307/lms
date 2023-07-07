import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@shared/constant";
import { GetAdminCourseReviewResourcesRequest, GetAdminCourseReviewResourcesResponse, courseReviewApi } from "@entities/courseReview";

export const useAdminCourseReviewsResources = (params: GetAdminCourseReviewResourcesRequest) => {
    return useQuery<GetAdminCourseReviewResourcesResponse>([QueryKeys.GET_ADMIN_COURSE_REVIEW_RESOURCES, params], () =>
        courseReviewApi.getAdminCourseReviewsResources(params),
    );
};
