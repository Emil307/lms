import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@shared/constant";
import { courseApi } from "@entities/course";

export const useAdminCourses = () => {
    return useQuery([QueryKeys.GET_ADMIN_COURSES], () => courseApi.getAdminCourses());
};
