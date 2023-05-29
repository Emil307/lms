import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@shared/constant";
import { AdminCoursePackageDetails, coursePackageApi } from "@entities/coursePackage";

export const useAdminCoursePackage = (id?: string) => {
    return useQuery<AdminCoursePackageDetails>([QueryKeys.GET_ADMIN_COURSE_PACKAGE, id], () => coursePackageApi.getAdminCoursePackage(id), {
        enabled: !!id,
    });
};
