import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { EntityNames, QueryKeys } from "@shared/constant";
import {
    courseCollectionApi,
    GetAdminCourseCollectionResourcesRequest,
    GetAdminCourseCollectionResourcesResponse,
} from "@entities/courseCollection";
import { FormErrorResponse } from "@shared/types";

export const useAdminCourseCollectionResources = (
    params: GetAdminCourseCollectionResourcesRequest
): UseQueryResult<GetAdminCourseCollectionResourcesResponse, AxiosError<FormErrorResponse>> => {
    return useQuery([QueryKeys.GET_ADMIN_COURSE_COLLECTION_RESOURCES, [EntityNames.COURSE_COLLECTION, EntityNames.COURSE], params], () =>
        courseCollectionApi.getAdminCourseCollectionResources(params)
    );
};
