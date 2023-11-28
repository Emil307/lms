import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { EntityNames, QueryKeys } from "@shared/constant";
import { GetAdminCourseReviewResourcesRequest, GetAdminCourseReviewResourcesResponse, courseReviewApi } from "@entities/courseReview";
import { FormErrorResponse } from "@shared/types";

export const useAdminCourseReviewsResources = (
    params: GetAdminCourseReviewResourcesRequest
): UseQueryResult<GetAdminCourseReviewResourcesResponse, AxiosError<FormErrorResponse>> => {
    return useQuery([QueryKeys.GET_ADMIN_COURSE_REVIEW_RESOURCES, [EntityNames.COURSE_REVIEW, EntityNames.COURSE], params], () =>
        courseReviewApi.getAdminCourseReviewsResources(params)
    );
};
