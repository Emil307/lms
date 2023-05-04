import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@shared/constant";
import { courseApi } from "@entities/course";

export const useAdminCourseResources = () => {
    return useQuery([QueryKeys.GET_ADMIN_COURSE_RESOURCES], () => courseApi.getAdminCourseResources());
};
