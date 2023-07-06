import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@shared/constant";
import { GetAdminCourseResourcesRequest, GetAdminCourseResourcesResponse, courseApi } from "@entities/course";

export const useAdminCourseResources = (params: GetAdminCourseResourcesRequest) => {
    return useQuery<GetAdminCourseResourcesResponse>([QueryKeys.GET_ADMIN_COURSE_RESOURCES, params], () =>
        courseApi.getAdminCourseResources(params)
    );
};
