import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@shared/constant";
import { GetAdminCoursesRequest, courseApi } from "@entities/course";

export const useAdminCourses = (data: GetAdminCoursesRequest) => {
    return useQuery([QueryKeys.GET_ADMIN_COURSES, data], () => courseApi.getAdminCourses(data));
};
