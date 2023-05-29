import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@shared/constant";
import { GetAdminCoursePackageResoursesResponse, coursePackageApi } from "@entities/coursePackage";

export const useAdminCoursePackageResourses = () => {
    return useQuery<GetAdminCoursePackageResoursesResponse>([QueryKeys.GET_ADMIN_COURSE_PACKAGE_RESOURSES], () =>
        coursePackageApi.getAdminCoursePackageResourses()
    );
};
