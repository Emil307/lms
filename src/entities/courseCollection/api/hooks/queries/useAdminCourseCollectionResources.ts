import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@shared/constant";
import {
    courseCollectionApi,
    GetAdminCourseCollectionResourcesRequest,
    GetAdminCourseCollectionResourcesResponse,
} from "@entities/courseCollection";

export const useAdminCourseCollectionResources = (params: GetAdminCourseCollectionResourcesRequest) => {
    return useQuery<GetAdminCourseCollectionResourcesResponse>([QueryKeys.GET_ADMIN_COURSE_COLLECTION_RESOURCES, params], () =>
        courseCollectionApi.getAdminCourseCollectionResources(params)
    );
};
