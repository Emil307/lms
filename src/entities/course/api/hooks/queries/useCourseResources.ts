import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@shared/constant";
import { GetCourseResourcesRequest, courseApi } from "@entities/course";

export const useCourseResources = (params: GetCourseResourcesRequest, enabled?: boolean) => {
    return useQuery([QueryKeys.GET_COURSE_RESOURCES, params], () => courseApi.getCourseResources(params), { enabled });
};
