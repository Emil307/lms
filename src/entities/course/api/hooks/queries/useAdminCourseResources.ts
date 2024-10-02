import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { EntityNames, QueryKeys } from "@shared/constant";
import { GetAdminCourseResourcesRequest, GetAdminCourseResourcesResponse, courseApi } from "@entities/course";
import { FormErrorResponse } from "@shared/types";

export const useAdminCourseResources = (
    params: GetAdminCourseResourcesRequest
): UseQueryResult<GetAdminCourseResourcesResponse, AxiosError<FormErrorResponse>> => {
    return useQuery(
        [QueryKeys.GET_ADMIN_COURSE_RESOURCES, [EntityNames.COURSE, EntityNames.CATEGORY, EntityNames.TAG, EntityNames.USER], params],
        () => courseApi.getAdminCourseResources(params)
    );
};
