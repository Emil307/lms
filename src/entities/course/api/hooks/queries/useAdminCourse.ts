import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@shared/constant";
import { courseApi } from "@entities/course";

export const useAdminCourse = (id: string) => {
    return useQuery([QueryKeys.GET_ADMIN_COURSE, id], () => courseApi.getAdminCourse(id), { enabled: !!id });
};
