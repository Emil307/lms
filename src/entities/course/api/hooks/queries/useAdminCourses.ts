import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@shared/constant";
import { AdminCoursesRequestParamsType, courseApi } from "@entities/course";

export const useAdminCourses = (data: AdminCoursesRequestParamsType) => {
    return useQuery([QueryKeys.GET_ADMIN_COURSES, data], () => courseApi.getAdminCourses(data));
};
