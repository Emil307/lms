import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { EntityNames, QueryKeys } from "@shared/constant";
import { GetCourseResourcesRequest, GetCourseResourcesResponse, courseApi } from "@entities/course";
import { FormErrorResponse } from "@shared/types";

export const useCourseResources = (
    params: GetCourseResourcesRequest,
    enabled?: boolean
): UseQueryResult<GetCourseResourcesResponse, AxiosError<FormErrorResponse>> => {
    return useQuery(
        [QueryKeys.GET_COURSE_RESOURCES, [EntityNames.COURSE, EntityNames.CATEGORY, EntityNames.TAG], params],
        () => courseApi.getCourseResources(params),
        {
            enabled,
        }
    );
};
